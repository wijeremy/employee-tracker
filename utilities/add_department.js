const inquirer = require('inquirer')
require('dotenv').config();
const {db} = require('../connection')

const promptDepartment = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: 'What is the name of your new department?',
        }
    ])
}

const addDepartment = async () => {
    const { department } = await promptDepartment();
    db.query(`INSERT INTO departments (name) VALUES ("${department}");`, 
    (err) => {
        err? console.log(err) : console.log('Department successfully added!')
    })
}

// addDepartment()

module.exports = {addDepartment}