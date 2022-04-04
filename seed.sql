USE role_db;

INSERT INTO department (name)
VALUES 
('HR'),
('Lawyers'),
('Housekeepers'),
('The Big People'),
('Entry Level'),
('Sales');

INSERT INTO role (title, salary, department_id)
VALUES
('Valet', 25000, 1),
('Chef', 45000, 2),
('Pilot', 100000, 3),
('Manager', 75000, 4),
('Custodian', 56000, 5),
('Entry', 36000, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('Kyle', 'Truk', 1, 483),
('Kia', 'Car', 2, 564),
('Por', 'Favor', 3, 789),
('Hucklebee', 'Harry', 4, 112),
('Peter', 'Frampton', 5, 3587),
('Bryce', 'Whittaker', 6, 1346);