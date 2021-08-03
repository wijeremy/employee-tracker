const {viewDepartments} = require('./view_departments')
const {viewRoles} = require('./view_roles')
const {viewEmployees} = require('./view_employees')
const {addDepartment} = require('./add_department')
const {addEmployee} = require('./add_employee')
const {addRole} = require('./add_role')
const {updateEmployee} = require('./update_employee')
const {promptInit} = require('./prompt_init')
require('dotenv').config();
const {db} = require('../config/connection')

const init = async () => {
    let {request} = await promptInit();
    switch (request) {
        case 'View all departments':
            await viewDepartments();
            break;
        case 'View all roles':
            await viewRoles();
            break;
        case 'View all employees':
            await viewEmployees();
            break;
        case 'Add a department':
            await addDepartment;
            break;
        case 'Add a role':
            await addEmployee();
            break;
        case 'Add an employee':
            await addRole();
            break;
        case 'Update and employee role':
            await updateEmployee();
            break;
        case 'Exit':
            process.exit();
            break;
        default:
            process.exit();
            break;
            
    }
    init();
}

init();

module.exports = {init}
