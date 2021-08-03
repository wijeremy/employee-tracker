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

const getDeparments = () => {
    return new Promise(async (resolve, reject) => {
        db.query('SELECT id AS "ID", name AS "Deparment" FROM departments;', function (err, results) {
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

const tryMe = async () => {
    console.log('getting promise:')
    const results = await getDepartments()
    console.log(`Here you go: ${results}`)
}

tryMe()
