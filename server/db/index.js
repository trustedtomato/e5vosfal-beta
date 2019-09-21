const { Pool } = require('pg');
const camelcaseKeys = require('camelcase-keys');

const pool = new Pool();

const db = {
  query: async (text, params) => {
    const { rows } = await pool.query(text, params);
    return rows.map(camelcaseKeys);
  },
  queryOne: async (text, params) => {
    const rows = await db.query(text, params);
    return rows[0];
  },
};

module.exports = db;
