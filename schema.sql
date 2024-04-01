--Drop the database if it exists--
DROP DATABASE IF EXISTS employeeTracker_db;

--create the employee tracker db --
CREATE DATABASE employeeTracker_db;

-- Tell Sql to use the database --
USE DATABASE employeeTracker_db;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT
    ON DELETE SET NULL
)