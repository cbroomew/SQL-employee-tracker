import inquirer from 'inquirer';
import { pool , connectToDB } from './connection.js';

const mainMenu = async () => {
    const answer = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View departments',
                'View roles',
                'View employees',
                'Add department',
                'Add role',
                'Add employee',
                'Update employee role',
                'Exit'
            ]
        }
    ]);

    switch (answer.action) {
        case 'View departments':
            await viewDepartments();
            break;
        case 'View roles':
            await viewRoles();
            break;
        case 'View employees':
            await viewEmployees();
            break;
        case 'Add department':
            await addDepartment();
            break;
        case 'Add role':
            await addRole();
            break;
        case 'Add employee':
            await addEmployee();
            break;
        case 'Update employee role':
            await updateEmployee();
            break;
        case 'Exit':
            await pool.end();
            console.log('Disconnected from the database');
            break;
    }
};

const viewDepartments = async () => {
    try {
        const res = await pool.query('SELECT * FROM department');
        console.table(res.rows);
    } catch (err) {
        console.error(err.stack);
    }
    mainMenu();
};

const viewRoles = async () => {
    try {
        const res = await pool.query('SELECT * FROM role');
        console.table(res.rows);
    } catch (err) {
        console.error(err.stack);
    }
    mainMenu();
};

const viewEmployees = async () => {
    try {
        const res = await pool.query('SELECT * FROM employee');
        console.table(res.rows);
    } catch (err) {
        console.error(err.stack);
    }
    mainMenu();
};

const addDepartment = async () => {
    const answer = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter the name of the department:'
        }
    ]);

    try {
        await pool.query('INSERT INTO department (name) VALUES ($1)', [answer.name]);
        console.log('Department added!');
    } catch (err) {
        console.error(err.stack);
    }
    mainMenu();
};

const addRole = async () => {
    const answer = await inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter the role:'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter the salary:'
        },
        {
            type: 'input',
            name: 'department_id',
            message: 'Enter the department ID:'
        }
    ]);

    try {
        await pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [answer.title, answer.salary, answer.department_id]);
        console.log('Role added');
    } catch (err) {
        console.error(err.stack);
    }
    mainMenu();
};

const addEmployee = async () => {
    const answer = await inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'Enter the employees first name:'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Enter the employees last name:'
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'Enter the employees role ID:'
        },
        {
            type: 'input',
            name: 'manager_id',
            message: 'Enter the manager ID for the employee (if any):'
        }
    ]);

    try {
        await pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [answer.first_name, answer.last_name, answer.role_id, answer.manager_id]);
        console.log('Employee added');
    } catch (err) {
        console.error(err.stack);
    }
    mainMenu();
};

const updateEmployee = async () => {
    const answer = await inquirer.prompt([
        {
            type: 'input',
            name: 'employee_id',
            message: 'Enter the ID of the employee to update:'
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'Enter the new role ID for the employee:'
        }
    ]);

    try {
        await pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [answer.role_id, answer.employee_id]);
        console.log('Employee role updated!');
    } catch (err) {
        console.error(err.stack);
    }
    mainMenu();
};

connectToDB().then(mainMenu);