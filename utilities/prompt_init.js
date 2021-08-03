const inquirer = require('inquirer')

const promptInit = () => {
    const initPrompts = [
        'View all departments', 
        'View all roles', 
        'View all employees', 
        'Add a department', 
        'Add a role', 
        'Add an employee', 
        'Update and employee role',
        'Exit'
    ]
    return inquirer.prompt([
        {
            type: 'list',
            name: 'request',
            message: 'What would you like to do?',
            choices: initPrompts
        }
    ])
}

module.exports = {promptInit}