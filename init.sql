create table if not exists products (
    id serial primary key,
    description  varchar(255) not null,
    price decimal(10,2) not null,
    stock integer not null,
    sku varchar(50) unique not null    
);

insert into products (description, price, stock, sku) values
('Laptop dell', 899.99, 10, 'lap-dell-001'),
('Smartphone samsung', 499.99, 25, 'sams-sm-002'),
('Tablet apple', 299.99, 15, 'tab-app-003'),
('Monitor lg', 199.99, 8, 'mon-lg-004'),
('Teclado logitech', 49.99, 30, 'tec-log-005');

