CREATE DATABASE bamazon_db;
USE bamazon_db;






CREATE TABLE products(
  item_id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(100),
  department_name VARCHAR(100),
  stock_quantity INT,
  price DECIMAL(10,4) NULL,
  PRIMARY KEY (item_id)
);
