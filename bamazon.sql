CREATE DATABASE bamazon_db;
USE bamazon_db;


CREATE TABLE products(
  item_id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(100),
  department_name VARCHAR(100),
  stock_quantity INT,
  price DECIMAL(10,2) NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, stock_quantity, price)
  VALUES
    ("Sunglasses", "Accessories", 13, 22.25),
    ("T-Shirt", "Tops", 24, 19.95),
    ("Oxford Shirt", "Tops", 17, 42.37),
    ("Polo Shirt", "Tops", 8, 36.95),
    ("Trousers", "Bottoms", 13, 55.95),
    ("Jeans", "Bottoms", 22, 60.95),
    ("Shorts", "Bottoms", 13, 30.25),
    ("Sneaker", "Footwear", 15, 50.75),
    ("Wing Tips", "Footwear", 7, 125.95),
    ("Chelsea Boots", "Footwear", 13, 189.95),
    ("Belt", "Accessories", 36, 26.95),
    ("Socks", "Accessories", 110, 9.95);

