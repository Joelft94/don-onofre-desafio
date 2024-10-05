CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price INTEGER NOT NULL,
  image_url VARCHAR(255)
);

INSERT INTO products (name, description, price, image_url) VALUES
('Laptop', 'Gaming laptop ', 6000000, '/images/laptop.jpg'),
('Teclado', 'Teclado Gamer', 120000, '/images/keyboard.jpg'),
('Headset', 'Gaming Headset', 300000, '/images/headphones.jpg');