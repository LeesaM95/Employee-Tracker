const inquirer = require('inquirer');
const connection = require('./db/connection');

const startMenu = () => {
    console.log(`======= EMPLOYEE ❧ ☼ ☙ TRACKER =======`);

    inquirer
        .prompt({
            name: "start",
            type: "list",
            message:"Select Command from Below",
            choices: [
                "View All Departments",
                "View All Roles",
                "View All Employees",
                "View All Employees By Manager",
                "View All Employees By Department",
                "Add a Department",
                "Add a Role",
                "Add an Employee",
                "Update an Employee Role",
                "Delete a Department",
                "Delete a Role",
                "Delete an Employee",
                "View Total Utilized Budget of a Department",
                "Exit",
            ],
        })
        .then((answer) => {
            switch (answer.start) {
                case "View All Departments":
                    ViewAllDepartments();
                    break;
                case "View All Roles":
                    ViewAllRoles();
                    break;
                case "View All Employees":
                    ViewAllEmployees();
                    break;
                case "View All Employees By Manager":
                    ViewAllEmployeesByManager();
                    break;
                case "View All Employees By Department":
                    ViewAllEmployeesByDepartment();
                    break;
                case "Add a Department":
                    AddDepartment();
                    break;
                case "Add a Role":
                    AddRole();
                    break;
                case "Add an Employee":
                    AddEmployee();
                    break;
                case "Update an Employee Role":
                    UpdateEmployeeRole();
                    break;
                case "Delete a Department":
                    DeleteDepartment();
                    break;
                case "Delete a Role":
                    DeleteRole();
                    break;
                case "Delete an Employee":
                    DeleteEmployee();
                    break;
                case "View Total Utilized Budget of a Department":
                    ViewTotalBudgetByDepartment();
                    break;
                case "Exit":
                    Exit();
                    break;
            }
        });
};

function ViewAllDepartments() {
    const query = `SELECT
    department.id
    department.name FROM
    department;`
    connection.query(query, (err, data) => {
        if (err) throw err;
        console.table(data);
        startMenu();
    })
};

function ViewAllRoles() {
    const query = `SELECT
    role.id
    role.title
    role.salary
    department.name AS department
    FROM role
    LEFT JOIN department ON
    role.department_id = department.id;
    `
    connection.query(query, (err, data) => {
        if (err) throw err;
        console.table(data);
        startMenu();
    })
};


function ViewAllEmployees() {
    const query = `SELECT
    employee.id
    employee.first_name
    employee.last_name
    role.title
    department.name AS
    department
    role.salary
    CONCAT(manager.first_name, ' ', manager.last_name) AS
    manager FROM
    employee
    LEFT JOIN department ON
    role.department_id = department.id
    LEFT JOIN employee manager ON
    manager.id = employee.manager_id;`

    connection.query(query, (err, data) => {
        if (err) throw err;
        console.table(data);
        startMenu();
    })
};

function ViewAllEmployeesByManager() {
    const query = `SELECT
    employee.id
    employee.first_name
    employee.last_name
    role.title
    department.name AS
    department
    CONCAT(manager.first_name, ' ', manager.last_name) AS
    manager FROM
    employee
    LEFT JOIN role ON employee.role = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee manager ON manager.id = employee.manager_id
    ORDER BY manager;`

    connection.query(query, (err, data) => {
        if (err) throw err;
        console.table(data);
        startMenu();
    })
};

function ViewAllEmployeesByDepartment() {
    // Use another inquirer prompt to select a department
    // departments: finance, marketing, operations management, human resources, information technology, employee health 
    // THEN display all employees by department

    inquirer
    .prompt({
        name: "department",
        type: "list",
        message: "Select Department You Would Like to View",
        choices: [
            "Finance",
            "Marketing",
            "Operations Management",
            "Human Resources",
            "Information Technology",
            "Employee Health",
        ],
    })
    .then((answer) => {
        switch (answer.department) {
            case "Finance":
                return ViewStaffByDepartment("Finance");
                
            case "Marketing":
                return ViewStaffByDepartment("Marketing");
                
            case "Operations Management":
                return ViewStaffByDepartment("Operations Management");
                
            case "Human Resources":
                return ViewStaffByDepartment("Human Resources");
                
            case "Information Technology":
                return ViewStaffByDepartment("Information Technology");
               
            case "Employee Health":
                return ViewStaffByDepartment("Employee Health");
                
        }
    });
    function ViewStaffByDepartment(department) {
        const query = `SELECT
        employee.id,
        employee.first_name,
        employee.last_name,
        role.title,
        department.name AS department
        FROM employee
        LEFT JOIN role ON employee.role_id = role.id
        LEFT JOIN department ON role.department_id = department.id
        WHERE department.name = ?;
        `
        connection.query(query, department, (err, data) => {
            if (err) throw err;
            console.table(data);
            startMenu();
        })
    }
    
};

function AddDepartment() {
    // initialize inquirer to ask if the user wants to create a new dept
    // prompt user to input the name of the new department
    inquirer
    .prompt([
        {
            type: "input",
            name: "name",
            message: "What is the name of the new department?",
        },
    ])
    // then have the program add the department to the list of departments
    .then((data) => {
        const { name } = data;
        connection.query(`INSERT INTO department (name) VALUES (?)?`,
        [name],
        (err, res) => {
            if (err) throw err;
            console.log(`-- ${name} Department has been added!`)
        }
        );

        ViewAllDepartments();
    }
    
    );
};

function AddRole() {
    // initialize inquirer to ask if user wants to create a new role
    // have the system pull up the department we want to add a role in before initializing the prompt sequence
    // prompt the user to add the name, salary, and department for the role
    const query = `SELECT department.name FROM department`
    connection.query(query, (err, data) => {
        if (err) throw err;

        // new departments array will hold the input responses
        const departments = data.map((item) => `${item.name}`);

        inquirer
        .prompt([
            {
                type: "input",
                name: "title",
                message: "Please input role title",
            },
            {
                type: "input",
                name: "salary",
                message: "Please input the salary of this role",
            },
            {
                type: "list",
                name: "department.name",
                message: "Please select the department of this role",
                choices: [...departments],
            },
        ])
        .then((data) => {
            const {title, salary, department_name } = data;
            connection.query(
                `INSERT INTO role (title, salary, department_id)
                SELECT ?, ?, department.id
                FROM department
                WHERE department.name = ?`,
                [title, salary, department_name],
                (err, res) => {
                    if (err) throw err;
                    console.log(`-- ${title} role has been added!`
                    );
                    ViewAllRoles();
                }
            )
        })
    })

};

function AddEmployee() {
//initialize inquirer after user selects 'add employee'
// have prompt ask for the following: 
// - first name, last name, role, and the employee's manager

// define user input
let userInput;

// Initialize prompts to list all roles for selection.

const query = `SELECT id, title FROM role WHERE title NOT LIKE '%Manager%';`;


};

function UpdateEmployeeRole() {

};

function DeleteDepartment() {

};

function DeleteEmployee() {

};

function DeleteRole() {

};

function Exit() {

}

