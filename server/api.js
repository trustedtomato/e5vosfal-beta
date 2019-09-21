const { Router } = require('express');
const request = require('request-promise');
const jwt = require('jsonwebtoken');
const sql = require('sql-tag');
const db = require('./db');

// populate process.env
require('dotenv').config();

// do routing
const router = Router();

router.post('/login', async (req, res) => {
  const { code } = req.body;
  if (!code) {
    // eslint-disable-next-line no-param-reassign
    res.statusCode = 400;
    res.json({
      error: 'NoParamSupplied',
      errorDescription: 'No code parameter supplied!',
    });
  }

  const {
    error,
    error_description: errorDescription,
    access_token: accessToken,
    refresh_token: refreshToken,
    id_token: idToken,
  } = await request.post('https://www.googleapis.com/oauth2/v4/token', {
    form: {
      code,
      client_id: process.env.GOOGLE_ID,
      client_secret: process.env.GOOGLE_SECRET,
      redirect_uri: process.env.GOOGLE_REDIRECT,
      scope: '',
      grant_type: 'authorization_code',
    },
    json: true,
  });

  // If something is not given, send an error.
  if (!accessToken || !refreshToken || !idToken) {
    // eslint-disable-next-line no-param-reassign
    res.statusCode = 400;
    res.json({
      error,
      errorDescription,
    });
    console.error(error, errorDescription);
    return;
  }

  const googleProfile = jwt.decode(idToken);
  // Non-e5vos.hu emails shall not pass.
  if (googleProfile.hd !== 'e5vos.hu') {
    // eslint-disable-next-line no-param-reassign
    res.statusCode = 400;
    res.json({
      error: 'BadHd',
      errorDescription: 'The hosted domain should be e5vos.hu!',
    });
    return;
  }

  // Find existing user.
  let user = await db.queryOne(sql`
    SELECT id, email, given_name, family_name, middle_name, avatar_url
    FROM "user"
    WHERE google_id=${googleProfile.sub}
    LIMIT 1
  `);

  // If the user is not registered yet, register them.
  if (!user) {
    // TODO: handle race condition: if (err.message.toLowerCase().includes('duplicate')) {
    user = await db.queryOne(sql`
      INSERT INTO "user" (email, given_name, family_name, middle_name, google_id, google_access_token, google_refresh_token, avatar_url)
      VALUES (
        ${googleProfile.email},
        ${googleProfile.given_name},
        ${googleProfile.family_name},
        ${googleProfile.middle_name},
        ${googleProfile.sub},
        ${accessToken},
        ${refreshToken},
        ${googleProfile.picture}
      )
      RETURNING id, email, given_name, family_name, middle_name, avatar_url
    `);
    console.log(`Registered user ${user.email}`);
  }

  console.log(`Logged in user ${user.email}`);

  // Create JWTs
  const siteJwt = jwt.sign(user, process.env.JWT_SECRET);
  const hasuraJwt = jwt.sign(
    {
      'https://hasura.io/jwt/claims': {
        'x-hasura-allowed-roles': ['user'],
        'x-hasura-default-role': 'user',
        'x-hasura-user-id': `${user.id}`,
      },
    },
    process.env.HASURA_JWT_SECRET,
    {
      noTimestamp: true,
    },
  );

  // Send JWTs
  res.json({
    jwt: siteJwt,
    hasuraJwt,
  });
});

module.exports = router;
