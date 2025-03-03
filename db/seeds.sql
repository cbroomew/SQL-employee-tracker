INSERT INTO department (name) VALUES ('Sales'), ('Engineering'), ('HR');

INSERT INTO role (title, salary, department_id) VALUES
('Salesperson', 50000, 1),
('Software Engineer', 80000, 2),
('HR Manager', 70000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('Alice', 'Smith', 1, NULL),
('Bob', 'Brown', 2, 1),
('Charlie', 'Davis', 3, NULL);
