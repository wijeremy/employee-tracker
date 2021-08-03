const express = require('express')
// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require("inquirer")
require('dotenv').config();


const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: process.env.DB_USER,
    // MySQL password
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  },
  console.log(`Connected to the database.`)
);

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const indexOf = (arr, value) => {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === value) {
            return i;
        }
    }
}

const viewDepartments = () => {
    db.query('SELECT id AS "ID", name AS "Deparment" FROM departments;', function (err, results) {
      err? console.error(`Error: ${err}`) : console.table(results);
    });
}

viewDepartments()

const getDepartments = () => {
    return new Promise(async (resolve, reject) => {
        db.query('SELECT name FROM departments;', (err, results) => {
            if(err){
                reject(err)
            }
            let department = Object.keys(results[0])[0];
            let arr = []
            for (let i = 0; i < results.length; i++){
                arr.push(results[i][department]);
            }
            resolve(arr)
        });
    })
}

const isNum = (input) => {
    if (isNaN(input)) {
      return 'Please provide a number'
    }
    return true
  }

const promptNewRole = (departments) => {
    return inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'What is the name of your new role?',
      },
      {
        type: 'input',
        name: 'salary',
        message: 'What is the salary for this role?',
        validate: isNum
      },
      {
        type: 'list',
        name: 'department',
        message: 'Which department will this role be in?',
        choices: departments
      }
    ])
}


const getDepartmentId = (department) => {
    return new Promise ((resolve, reject) => {
        db.query(`SELECT id FROM departments WHERE name = "${department}";`, (err, results) => {
            if (err){
                reject (err)
            }
            const key = Object.keys(results[0])[0]
            resolve(results[0][key])
        })
    })
}


const setNewRole = async () => {
    const departments = await getDepartments();
    const results = await promptNewRole(departments);
    const { title, salary, department } = results;
    const departmentId = await getDepartmentId(department)
    db.query(`INSERT INTO roles (title, salary, department_id) VALUES ('${title}', ${salary}, ${departmentId});`, (err) => {
        err? console.error(err) : console.log("New role successfully created!")
    })
}

// setNewRole()

const getEmployees = () => {
    return new Promise ((resolve, reject) => {
        db.query('Select id, first_name, last_name FROM employees', (err, result) => {
            err? reject(err) : resolve(result)
        })
    })
}

const arrayEmployeeNames = (employees) => {
    const firstName = Object.keys(employees[0])[1];
    const lastName = Object.keys(employees[0])[2];
    let names = []
    for (let i = 0; i < employees.length; i++){
        let name = [employees[i][firstName], employees[i][lastName]].join(" ");
        names.push(name)
    }
    return names
}

const promptEmployee = async (roles, managers) => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: "What is your new employee's first name?",
        },
        {
            type: 'input',
            name: 'last_name',
            message: "What is your new employee's last name?"
        },
        {
            type: 'list',
            name: 'role',
            message: "What is your new employee's role?",
            choices: roles
        },
        {
            type: 'list',
            name: 'manager',
            message: "Who is your new employee's manager?",
            choices: managers
        }
    ])
}

const getRoles = () => {
    return new Promise ((resolve, reject) => {
        db.query('Select id, title From roles', (err, result) => {
            err? reject(err) : resolve(result)
        })
    })
}

const arrayRoles = (roles) => {
    const name = Object.keys(roles[0])[1];
    let arr = []
    for (let i = 0; i < roles.length; i++){
        arr.push(roles[i][name])
    }
    return arr
}


const setEmployee = async () => {
    const rolesData = await getRoles();
    const roles = arrayRoles(rolesData);

    const employeeData = await getEmployees();
    const managers = arrayEmployeeNames(employeeData);
    
    const result = await promptEmployee(roles, managers);

    const chosenRoleIndex = indexOf(roles, result.role);
    const roleIdKey = Object.keys(rolesData[0])[0];
    const roleId = rolesData[chosenRoleIndex][roleIdKey];

    const chosenManagerIndex = indexOf(managers, result.manager);
    const managerIdKey = Object.keys(employeeData[0])[0];
    const managerId = employeeData[chosenManagerIndex][managerIdKey];

    db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) 
        VALUES ('${result.first_name}', '${result.last_name}', ${roleId}, ${managerId});`, 
        (err) => {
            err? console.error(err) : console.log("Employee successfully added!")
        })
}

// setEmployee()

const promptUpdate = (employees, roles) => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'employee',
            message: 'Which employee would you like to update?',
            choices: employees
        },
        {
            type: 'list',
            name: 'role',
            message: 'Which role would you like them to have?',
            choices: roles
        }
    ])
}

const updateEmployee = async () => {
    const employeeData = await getEmployees();
    const employees = arrayEmployeeNames(employeeData);

    const rolesData = await getRoles();
    const roles = arrayRoles(rolesData);

    const result = promptUpdate(employees, roles);

    const chosenRoleIndex = indexOf(roles, result.role);
    const roleIdKey = Object.keys(rolesData[0])[0];
    const roleId = rolesData[chosenRoleIndex][roleIdKey];

    const chosenEmployeeIndex = indexOf(employees, result.employee);
    const employeeIdKey = Object.keys(employeeData[0])[0];
    const employeeId = employeeData[chosenEmployeeIndex][employeeIdKey];

    db.query(`UDATE employees SET role_id = ${roleId} WHERE id = ${employeeId}`,
        (err) => {
            err? console.error(err) : console.log("Employee successfully updated!")
        })
}

const promptDepartment = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: 'What is the name of your new department?',
        }
    ])
}

const newDepartment = async () => {
    const { department } = await promptDepartment();
    db.query(`INSERT INTO departments (name) VALUES (${department})`)
}

// newDepartment()