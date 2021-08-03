require('dotenv').config();
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'busterbrown',
      database: 'company_db'
    },
    console.log(`Connected to the classlist_db database.`)
  );

  module.exports = {db}