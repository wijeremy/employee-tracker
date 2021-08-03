require('dotenv').config();
const {db} = require('../connection')

const indexOf = (arr, value) => {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === value) {
            return i;
        }
    }
}

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

module.exports = {
    indexOf,
    getEmployees,
    arrayEmployeeNames,
    getRoles,
    arrayRoles
}