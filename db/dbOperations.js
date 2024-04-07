const connection = require("./connection");

const db = {
    ViewAllDepartments: async () => {
        const query = `SELECT * FROM department`;
        const [rows] = await connection.promise().query(query);
        console.table(rows);
    },
    ViewAllRoles: async () => {
        const query = `SELECT * FROM role`;
        const [rows] = await connection.promise().query(query);
        console.table(rows);
    },
    ViewAllEmployees: async () => {
        try {
            const query = `SELECT 
            e.id, e.first_name, e.last_name, r.title AS role, d.name AS department, r.salary,
            CONCAT(m.first_name, ' '), m.last_name) AS manager
            FROM
            employee e
            LEFT JOIN role r ON e.role_id = role.id`;
            const [rows] = await connection.promise().query(query);
            console.table(rows)
        } catch (error) {
            console.error("Error fetching employees:", error);
        }
    },
    ViewAllEmployeesByDepartment: async (departmentId) => {

        const query = `SELECT * FROM employee WHERE role_id IN (SELECT id FROM role WHERE department_id = ?)`;
        const [rows] = await connection.promise().query(query, [departmentId]);
        console.table(rows);
    },
    ViewAllEmployeesByManager: async (managerId) => {
        const query = `SELECT * FROM employee WHERE manager_id = ?`;
        const [rows] = await connection.promise().query(query, [managerId]);
        console.table(rows)
    },
    AddDepartment: async (name) => {
        const query = `INSERT INTO department (name) VALUES (?)`;
        await connection.promise().query(query, [name]);
        console.log(`${name} Department has been added successfully`)
    },
    AddRole: async (title, salary, departmentId) => {
        try {
            const query = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
            await connection.promise().query(query[title, salary, departmentId]);
            console.log(`The role of ${title} has been successfully added`)
        } catch (error) {
            console.error(`Error adding new role: ${error.message}`)
        }
    },
    AddEmployee: async (firstName, lastName, roleId, departmentId) => {
        const query = `INSERT INTO employe (first_name, last_name, role_id, department_id) VALUES (?, ?, ?, ?)`;
        await connection.promise().query(query, [firstName, lastName, roleId, departmentId]);
        console.log(`New Employee ${firstName} ${lastName} has been successfully added to the database`);
    },
    UpdateEmployeeRole: async (employeeId, roleId) => {
        const query = `UPDATE employee SET role_id = ? WHERE id = ?`;
        await connection.promise().query(query, [roleId, employeeId]);
        console.log(`Employee's role updated successfully!`);
    },
    DeleteRole: async (roleId) => {
        const query = `DELETE FROM role WHERE id = ?`;
        const [rows] = await connection.promise().query(query, [roleId]);
        console.table(rows)
    },
    DeleteDepartment: async (departmentId) => {
        const query = `DELETE FROM department WHERE id = ?`;
        const [rows] = await connection.promise().query(query, [departmentId]);
        console.table(rows);
    },
    DeleteEmployee: async (employeeId) => {
        const query = `DELETE FROM employee WHERE id = ?`;
        const [rows] = await connection.promise().query(query, [employeeId]);
        console.table(rows)
    },
    ViewTotalBudgetByDepartment: async (departmentId) => {
        const query = `SELECT
                       d.name AS department, SUM(r.salary) AS total_budget
                       FROM employee e
                       JOIN role r ON e.role_id = r.id
                       JOIN department d ON r.department_id = d.id
                       WHERE
                       d.id = ?
                       GROUP BY
                       d.name`;
        const [rows] = await connection.promise().query(query, [departmentId]);
        console.table(rows);
    },
    GetRoles: async () => {
        const query = `SELECT id, title FROM role`;
        const [rows] = await connection.promise().query(query);
        return rows;
    },
    GetManagers: async () => {
        const query = `SELECT id, first_name, last_name FROM employee WHERE manager_id IS NULL`;
        const [rows] = await connection.promise().query(query);
        return rows;
    },
    GetRoleById: async (title) => {
        const query = `SELECT id FROM role WHERE title = ?`;
        const [rows] = await connection.promise().query(query, [title]);
        return rows[0].id;
    },
    GetDepartmentById: async (name) => {
        const query = `SELECT id FROM department WHERE name = ?`;
        const [rows] = await connection.promise().query(query, [name]);
        return rows[0].id
    },
    GetManagersById: async (managerName) => {
        const [firstName, lastName] = managerName.split(" ");
        const query = `SELECT id from EMPLOYEE WHERE first_name = ? AND last_name = ?`;
        const [rows] = await connection.promise().query(query, [firstName, lastName]);
        return rows[0].id;
    },

};

module.exports = {
    ...db,
    GetRoles,
    GetManagers,
    GetRoleById,
    GetDepartmentById,
    GetManagersById
};

