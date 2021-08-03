const {
    indexOf,
    getEmployees, 
    arrayEmployeeNames, 
    getRoles,
    arrayRoles} = require('./utilities')

const inquirer = require('inquirer')
const {db} = require('../connection')

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

    const result = await promptUpdate(employees, roles);

    const chosenRoleIndex = indexOf(roles, result.role);
    const roleIdKey = Object.keys(rolesData[0])[0];
    const roleId = rolesData[chosenRoleIndex][roleIdKey];

    const chosenEmployeeIndex = indexOf(employees, result.employee);
    const employeeIdKey = Object.keys(employeeData[0])[0];
    const employeeId = employeeData[chosenEmployeeIndex][employeeIdKey];

    db.query(`UPDATE employees SET role_id = ${roleId} WHERE id = ${employeeId};`,
        (err) => {
            err? console.error(err) : console.log("Employee successfully updated!")
        })
}

module.exports = {updateEmployee}