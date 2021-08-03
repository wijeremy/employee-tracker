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

const viewDepartments = () => {
    db.query('SELECT id AS "ID", name AS "Deparment" FROM departments;', function (err, results) {
      err? console.error(`Error: ${err}`) : console.table(results);
    });
}

const getDepartments = () => {
    return new Promise(async (resolve, reject) => {
        db.query('SELECT id AS "ID", name AS "Deparment" FROM departments;', (err, results) => {
            if(err){
                reject(err)
            }
            let department = Object.keys(results[0])[1];
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

setNewRole()
