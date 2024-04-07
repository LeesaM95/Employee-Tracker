const inquirer = require('inquirer');
const mysql = require('mysql');
const conTable = require('console.table');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Mikkun831!",
    database: "employeeTracker_db",
});

connection.connect((err) => {
    if (err) throw err;
    console.log("You are now connected to the database.");
    startMenu();
});

const startMenu = () => {
    inquirer
        .prompt({
            name: "start",
            type: "list",
            message: "Select Command from Below",
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
    const query = `SELECT * FROM department;`
    connection.query(query, (err, data) => {
        if (err) throw err;
        conTable(data);
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
        conTable(data);
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
        conTable(data);
        startMenu();
    })
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
        .then((answer) => {
            const query = (`INSERT INTO department (name) VALUES (?)?`)
            connection.query(query, [answer.name], (err, res) => {
                if (err) throw err;
                console.log(`-- Department has been added!`)
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
            .then((answer) => {
                const query = `INSERT INTO role (title, salary, department_id)
                SELECT ?, ?, department.id
                FROM department
                WHERE department.name = ?`
                connection.query(query, [answer.title, answer.salary, answer.department_id],
                    (err, res) => {
                        if (err) throw err;
                        console.log(`-- Role has been added!`
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
    let query = "SELECT id, title FROM role";
    connection.query(query, (err, roles) => {
        if (err) throw err;
        const roleList = roles.map(({ id, title }) => ({
            name: title,
            value: id,
        }));
        query = "SELECT id, CONCAT(first_name, ' ', last_name) AS name FROM employee";

        connection.query(query, (err, employees) => {
            if (err) throw err;
            const managerLi = employees.map(({ id, name }) => ({
                name,
                value: id,
            }))
            managerLi.unshift({ name: "None", value: null })
            inquirer
                .prompt([
                    {
                        name: "firstName",
                        type: "input",
                        message: "Please enter employee's first name",
                    },
                    {
                        name: "lastName",
                        type: "input",
                        message: "Please enter employee's last name",
                    },
                    {
                        name: "roleId",
                        type: "list",
                        message: "Please select the employee's role",
                        choices: roleList,
                    },
                    {
                        name: "managerId",
                        type: "list",
                        message: "Please select employee's manager",
                        choices: managerLi,
                    },
                ])
                .then((answer) => {
                    query = "INSERT INTO employee SET?"
                    connection.query(query, {
                        first_name: answer.firstName,
                        last_name: answer.lastName,
                        role_id: answer.roleId,
                        manager_id: answer.managerId,
                    },
                        (err, result) => {
                            if (err) throw err;
                            console.log("Employee added!")
                            ViewAllEmployees();
                        }
                    )
                })
        })
    })

};

function UpdateEmployeeRole() {
    // Initialize inquirer prompt when a user Selects Update Employee Role
    // First and foremost, query out the first and last name of the employee from the employee table
    const query = `SELECT first_name, last_name FROM employee`;
    connection.query(query, (err, data) => {
        // map the user input into an array for easy storage and adjustment
        const employees = data.map((item) => `${item.first_name} ${item.last_name}`);

        // time to prompt the user to select an employee to update
        inquirer
            .prompt([
                {
                    name: "employee",
                    type: "list",
                    message: "Select employee to update",
                    choices: employees,
                },
            ])
            .then((answer) => {
                // obtain the employees first and last name
                const chosenEmployee = answer.employee.splot(" ");
                const firstName = chosenEmployee[0];
                const lastName = chosenEmployee[1];

                // then query the role table to retrieve all the available roles
                const query = `SELECT title FROM role;`;
                //map those roles to an array for easier adjustment
                connection.query(query, (err, data) => {
                    const roles = data.map((item) => item.title);
                    // then prompt the user to select a new role for the employee

                    inquirer
                        .prompt({
                            name: "role",
                            type: "list",
                            message: "Select new role for the employee",
                            choices: roles,
                        })
                })
                    // then, we get the role's ID..
                    .then((answer) => {
                        const query = `SELECT id FROM role WHERE title = ?`;
                        connection.query(query, [answer.role], (err, data) => {
                            if (err) throw err;
                            const roleId = data[0].id;

                            // and update the employee's role in the database ouob
                            const query = `UPDATE employee SET role_id = ? WHERE first_name = ? AND last_name = ?`
                            connection.query(
                                query,
                                [roleId, firstName, lastName],
                                (err, data) => {
                                    if (err) throw err;
                                    console.log(`The role for employee ${firstName} ${lastName} has been successfully updated to ${answer.role}.`)
                                    ViewAllEmployees();
                                }
                            );
                        });
                    });
            })
    })
};

function DeleteDepartment() {
    // We remove the department by name
    // Prompt the user to select a department to delete
    connection.query(`SELECT department.name FROM department`, (err, data) => {
        //make an array to store all the different department names! 
        const departments = data.map((item) => `${item.name}`);
        // Make a new prompt so it's easier for the user to quickly pull up the dept name and select it
        inquirer
            .prompt([
                {
                    name: "name",
                    type: "list",
                    message: "Select the department you wish to delete",
                    choices: [...departments],
                },
            ])
            .then((data) => {
                // Check if the department actually exists. If it doesn't display an error message, if it does, delete the department
                const { name } = data;
                connection.query("SELECT * FROM department WHERE name = '" + name + "'"),
                    (err, res) => {
                        if (err) throw err;
                        if (res.length === 0) {
                            console.log(`Department with that name does not exist.`);
                        }
                        if (res.length !== 0) {
                            connection.query(
                                "DELETE FROM department WHERE name = '" + name + "'",
                                (err, res) => {
                                    if (err) throw err;
                                    if (res.affectedRows === 0) {
                                        console.log(`Department ${data.name} does not exist.`)
                                    } else {
                                        conTable({
                                            message: `Department ${data.name} has been successfully removed.`,
                                            affectedRows: res.affectedRows,
                                        });
                                        ViewAllDepartments();
                                    }
                                }
                            )
                        }
                    }
            })
    })
};

function DeleteEmployee() {
    // If the user chooses to delete an employee, initalize the prompt window to do as such. 
    // we'll need to make sure to delete the employee's first + last name, role, and manager

    // so, we create a query targeting these items to make it easier for the user to input these items.
    const query = `SELECT 
                   employee.id,
                   employee.first_name,
                   employee.last_name,
                   role.title,
                   department.name AS department,
                   role.salary,
                   CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee
                   LEFT JOIN role ON employee.role_id = role.id
                   LEFT JOIN department ON role.department_id = department.id
                   LEFT JOIN employee manager ON manager.id = employee.manager_id;`;

    // With everything queried properly to target all the items that needed to be deleted alongside the employee, we establish the connection
    connection.query(query, (err, data) => {
        if (err) throw err;

        // we create an array to keep all the employee information nice, neat, and adjustable
        const employees = data.map((item) => `${item.first_name} ${item.last_name}`);
        inquirer
            .prompt({
                name: "employee",
                type: "list",
                message: "Please select the employee you would like to remove.",
                choices: [...employees],
            })
            .then((answer) => {

                // delete the employee in from the database based on user choice
                const query = `DELETE FROM employee WHERE first_name = ? AND last_name = ?`;
                connection.query(query,
                    [answer.employee.split(" ")[0], answer.employee.split(" ")[1]], (err, data) => {
                        if (err) throw err;
                        console.log(`${answer.employee} has been successfully removed from the database.`);
                        ViewAllEmployees();
                    })
            })
    })
};

function DeleteRole() {
    // if user selects 'delete role' - delete the role by title, salary, and department

    // we start with the removal prompt
    connection.query("SELECT role.title FROM role", (err, data) => {
        // as always, create an array for the info for ease of access
        const roles = data.map((item) => `${item.title}`);
        inquirer
            .prompt([
                {
                    name: "title",
                    type: "list",
                    message: "Please select the role you wish to delete",
                    choices: [...roles],
                },
            ])
            .then((data) => {
                // define that the prompt name is equal to our data
                const { title } = data;

                // check if this role exists, if it doesn't, display a message, if it does, delete the role
                connection.query("SELECT * FROM role WHERE title = '" + title + '"'),
                    (err, res) => {
                        if (res.length === 0) {
                            console.log(`${data.title} does not exist.`)
                        }
                        if (res.length !== 0) {
                            connection.query("DELETE FROM role WHERE title= '" + title + '"'),
                                (err, res) => {
                                    if (err) throw err;
                                    if (res.affectedRows === 0) {
                                        console.log(`${data.title} does not exist in Roles.`)
                                    } else {
                                        conTable({ message: `The role of ${data.title} has been successfully removed.`, affectedRows: res.affectedRows });
                                        ViewAllRoles();
                                    }
                                }
                        }
                    }
            })
    })
};

function Exit() {
    console.log("Until next time!");
    connection.end();
}

startMenu();