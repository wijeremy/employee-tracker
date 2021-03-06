const {db} = require('../connection')

const viewEmployees = () => {
    db.query(`
      SELECT 
        e.id AS "ID", 
        e.first_name AS "First Name",  
        e.last_name AS "Last Name", 
        r.title AS "Job Title", 
        d.name AS "Department", 
        r.salary as "Salary", 
        m.first_name AS "Manager First Name", 
        m.last_name AS "Manager Last Name" 
      FROM employees e 
      JOIN roles r ON e.role_id = r.id 
      JOIN departments d ON r.department_id = d.id 
      LEFT JOIN employees m ON e.manager_id = m.id;`, 
      (err, results) => {
        if (err) {
          throw err
        }
        console.log (
          `

-------- Here are your employees -----------
          `
        )
        console.table(results);
        console.log(
          `
press up or down to continue
          `
        )
      }
    );
  }

module.exports = {viewEmployees}