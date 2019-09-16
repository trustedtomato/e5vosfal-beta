const { Router } = require('express');
const request = require('request');

// populate process.env
require('dotenv').config();

// do routing
const router = Router();

router.post('/login', async (req, res) => {
  const { code } = req.body;
  request.post('https://www.googleapis.com/oauth2/v4/token', {
    form: {
      code,
      client_id: process.env.GOOGLE_ID,
      client_secret: process.env.GOOGLE_SECRET,
      redirect_uri: process.env.GOOGLE_REDIRECT,
      scope: '',
      grant_type: 'authorization_code',
    },
  }, (err, httpRes, body) => {
    console.log(body);
  });
});

module.exports = router;
