const { Pool, Client } = require('pg');

// setup psql
module.exports = new Pool({
    user: 'psql',
    host: 'localhost',
    database: 'assignar',
    password: 'psql',
    port: 5432,
});
  