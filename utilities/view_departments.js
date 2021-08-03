const {db} = require('../connection')

const viewDepartments = () => {
    db.query('SELECT id AS "ID", name AS "Deparment" FROM departments;', function (err, results) {
      if (err) {
        throw err
      }
      console.log (
        `

-------- Here are your departments -----------
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

module.exports = {viewDepartments}