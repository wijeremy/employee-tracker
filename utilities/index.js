const {viewDepartments} = require('./view_departments')
const {viewRoles} = require('./view_roles')
const {viewEmployees} = require('./view_employees')
const {addDepartment} = require('./add_department')
const {addEmployee} = require('./add_employee')
const {addRole} = require('./add_role')
const {updateEmployee} = require('./update_employee')
const {promptInit} = require('./prompt_init')

const init = async () => {
    let {request} = await promptInit();
    switch (request) {
        case 'View all departments':
            await viewDepartments();
            init();
            break;
        case 'View all roles':
            await viewRoles();
            init();
            break;
        case 'View all employees':
            await viewEmployees();
            init();
            break;
        case 'Add a department':
            await addDepartment();
            init();
            break;
        case 'Add a role':
            await addRole();
            init();
            break;
        case 'Add an employee':
            await addEmployee();
            init();
            break;
        case 'Update and employee role':
            await updateEmployee();
            init();
            break;
        case 'Exit':
            process.exit();
            break;
        default:
            process.exit();
            break;
            
    }
}

// init();

module.exports = {init}
