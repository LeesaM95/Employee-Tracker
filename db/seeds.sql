INSERT INTO department (name)
VALUES ('Finance'),
       ('Marketing'),
       ('Operations'),
       ('Human Resources'),
       ('Administration');

INSERT INTO role (title, salary, department_id)
VALUES  ('CFO, 439956, 1'),
        ('Financial Analyst, 69559, 1'),
        ('Accountant, 67010, 1'),
        ('Public Relations, 54273, 2'),
        ('Marketing Manager, 75368, 2'),
        ('Data Analyst, 89890, 2'),
        ('People Operations, 63000, 3'),
        ('Risk Analyst, 86700, 3'),
        ('Quality Control Analyst, 62034, 3'),
        ('Human Resources Manager, 105708, 4'),
        ('Benefits Administrator, 58738, 4'),
        ('HR Analyst, 71871, 4'),
        ('Administrator, 65481, 5'),
        ('Executive Assistant, 60000, 5'),
        ('Data Entry Clerk, 37360, 5');

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('Jenny', 'Yokobori', 4, NULL),
        ('Manuel', 'Orellana', 7, 7),
        ('Avery', 'Hill', 13, NULL),
        ('Remi', 'Whitmore', 3, 1),
        ('Tova', 'Mathews', 10, 10),
        ('Vilen', 'Wrona', 3, NULL),
        ('Abdur', 'Rashid', 6, NULL),
        ('Sakina', 'Moffett', 10, 10),
        ('Lilya', 'Tran', 1, 1),
        ('Lakeisha', 'Charles', 15, NULL),
        ('Darius', 'Diaz', 4, 4),
        ('Jeanette', 'Yang', 8, NULL),
        ('Rhonda', 'Tyler', 5, 5),
        ('Rochelle', 'Hoffman', 13, 13),
        ('Jean', 'Gunnhildr', 1, 4),
        ('Diluc', 'Ragnvindr', 5, 5),
        ('Kaeya', 'Alberich', 6, NULL),
        ('Mona', 'Magistus', 12, NULL),
        ('Sara', 'Kujou', 14, NULL),
        ('Hu', 'Tao', 10, 10);











