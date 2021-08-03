require('dotenv').config();
const {db} = require('../config/connection')

const viewRoles = () => {
    db.query('SELECT r.id AS "ID", r.title AS "Job Title", d.name AS "Department" FROM roles r JOIN departments d ON r.department_id = d.id;', function (err, results) {
      err? console.error(`Error: ${err}`) : console.table(results);
    });
  }

module.exports = {viewRoles}