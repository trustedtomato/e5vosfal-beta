const sql = require('sql-tag');

const userRowToUser = ({
  id,
  email,
  name,
  google_id: googleId,
  google_access_token: googleAccessToken,
}) => ({
  id,
  email,
  name,
  googleId,
  googleAccessToken,
});

const findUserSql = ({
  id,
  email,
  googleId,
}) => sql`
  SELECT *
  FROM "user"
  WHERE
    id=${id} OR
    email=${email} OR
    google_id=${googleId}
  LIMIT 1
`;

const insertUserSql = ({
  email,
  name,
  googleId,
  googleAccessToken,
  googleRefreshToken,
  avatarUrl,
}) => sql`
  INSERT INTO "user" (email, name, google_id, google_access_token, google_refresh_token, avatar_url)
  VALUES (${email}, ${name}, ${googleId}, ${googleAccessToken}, ${googleRefreshToken}, ${avatarUrl})
  RETURNING *
`;

const updateUserSql = ({
  id,
  email,
  name,
  googleId,
  googleAccessToken,
  avatarUrl,
}) => sql`
  UPDATE "user"
  SET
    email = ${email},
    name = ${name},
    google_id = ${googleId},
    google_access_token = ${googleAccessToken},
    avatar_url = ${avatarUrl}
  WHERE id = ${id}
  RETURNING *
`;

const removeUserSql = ({ id }) => sql`
  DELETE FROM "user"
  WHERE id = ${id}
`;


module.exports = (pool) => {
  const queryOne = q => pool.query(q)
    .then(({ rows }) => rows[0])
    .then(row => row && userRowToUser(row));

  return {
    async find({
      id,
      email,
      googleId,
    }) {
      const user = await queryOne(findUserSql({
        id,
        email,
        googleId,
      }));
      return user;
    },
    async insert(user) {
      console.log('insert', user);
      const newUser = await queryOne(insertUserSql(user));
      return newUser;
    },
    async update(user) {
      console.log('update', user);
      const updatedUser = await queryOne(updateUserSql(user));
      return updatedUser;
    },
    async remove(id) {
      console.log('remove', id);
      const removedUser = await queryOne(removeUserSql({ id }));
      return removedUser;
    },
    async serialize(user) {
      console.log('serialize', user.id);
      return user.id;
    },
    async deserialize(id) {
      console.log('deseralize', id);
      const x = process.hrtime();
      const user = await queryOne(findUserSql({ id }));
      const perf = process.hrtime(x);
      console.log(perf);
      return user;
    },
  };
};
