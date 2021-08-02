INSERT INTO departments (name)
VALUES 
    ('Upper Management'),
    ('Sales'),
    ('HR'),
    ('IT'),
    ('Support');

INSERT INTO roles (title, salary, department_id)
VALUES 
    ('CEO', 1000000.00, 1),
    ('Sales Manager', 100000.00, 2),
    ('Sales Rep', 50000.00, 2),
    ('HR Lead', 75000.00, 3),
    ('HR Associate', 50000.00, 3),
    ('IT Manager', 100000.00, 4),
    ('IT Associate', 50000.00, 4),
    ('Support Lead', 50000.00, 5),
    ('Support Associate', 30000.00, 5);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES 
    ('John', 'Ownsyou', 1, null),
    ('Betty', 'Smith', 2, 1),
    ('Chris', 'Kendal', 4, 1),
    ('Jeremy', 'Williams', 6, 1),
    ('Amanda', 'OToole', 8, 1),
    ('Mike', 'Pluton', 3, 2),
    ('Shery', 'Waites', 3, 2),
    ('Connor', 'Connors', 3, 2),
    ('Deborah', 'Katz', 3, 2),
    ('Brandon', 'Andrews', 5, 3),
    ('Mike', 'Punch', 5, 3),
    ('Pluto', 'The Cat', 7, 4),
    ('Candie', 'Pierce-Winters', 9, 5),
    ('Marie Claire', 'Sullivan', 9, 5),
    ('Tim', 'Acioli', 9, 5);
