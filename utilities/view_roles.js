const {db} = require('../connection')

const viewRoles = () => {
    db.query('SELECT r.id AS "ID", r.title AS "Job Title", d.name AS "Department" FROM roles r JOIN departments d ON r.department_id = d.id;', function (err, results) {
      if (err) {
        throw err
      }
      console.log (
        `

-------- Here are your roles -----------
        `
      )
      console.table(results)
      console.log(
        `
press up or down to continue
        `
      )
    });
  }

module.exports = {viewRoles}