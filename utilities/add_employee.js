const {
    indexOf,
    getEmployees, 
    arrayEmployeeNames, 
    getRoles,
    arrayRoles} = require('./utilities')

const inquirer = require('inquirer')
const {db} = require('../connection')

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

const addEmployee = async () => {
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
        VALUES ("${result.first_name}", "${result.last_name}", ${roleId}, ${managerId});`, 
        (err) => {
        err? console.log(err) : console.log(`
-----------------------------        
Employee successfully added!
-----------------------------`)
        })
}

module.exports = {addEmployee}