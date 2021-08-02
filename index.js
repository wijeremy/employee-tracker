const inquirer = require("inquirer")

const promptUser = () => {
    return inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is your name?',
      },
      {
        type: 'input',
        name: 'location',
        message: 'Where are you from?',
      },
      {
        type: 'input',
        name: 'hobby',
        message: 'What is your favorite hobby?',
      },
      {
        type: 'input',
        name: 'food',
        message: 'What is your favorite food?',
      },
      {
        type: 'input',
        name: 'github',
        message: 'Enter your GitHub Username',
      },
      {
        type: 'input',
        name: 'linkedin',
        message: 'Enter your LinkedIn URL.',
      },
    ]);
  };

//   view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
const initPrompts = [
    'View all departments', 
    'View all roles', 
    'View all employees', 
    'Add a department', 
    'Add a role', 
    'Add an employee', 
    'Update and employee role'
]

const indexOf = (arr, value) => {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === value) {
            return i;
        }
    }
}

const promptInit = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'request',
            message: 'What would you like to do?',
            options: [initPrompts]
        }
    ])
}

const viewDepartments = () => {
  db.query('SELECT id AS "ID", name AS "Deparment" FROM departments;', function (err, results) {
    err? console.error(`Error: ${err}`) : console.table(results);
  });
}

const viewRoles = () => {
  db.query('SELECT r.id AS "ID", r.title AS "Job Title", d.name AS "Department" FROM roles r JOIN departments d ON r.department_id = d.id;', function (err, results) {
    err? console.error(`Error: ${err}`) : console.table(results);
  });
}

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
    LEFT JOIN employees m ON e.manager_id = m.id;`, function (err, results) {
    err? console.error(`Error: ${err}`) : console.table(results);
  });
}

const promptNewDepartment = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'department',
      message: 'What is the name of your new department?',
    },
  ])
}

const setNewDepartment = (department) => {
  db.query(`INSERT INTO departments (name) VALUES (${department});`, function(err, results) {
    err? console.error(`Error: ${err}`) : console.log('Department successfully added!')
  })
}

const isNum = (input) => {
  if (isNaN(input)) {
    return 'Please provide a number'
  }
  return true
}

const promptNewRole = () => {
  return inquirer.prompt([
    {
      type: 'input'
    }
  ])
}