require('dotenv').config();
const {db} = require('../config/connection')

const viewDepartments = () => {
    db.query('SELECT id AS "ID", name AS "Deparment" FROM departments;', function (err, results) {
      err? console.error(`Error: ${err}`) : console.table(results);
    });
}

module.exports = {viewDepartments}