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



CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  debt_id VARCHAR(255) NOT NULL,
  total_amount INTEGER NOT NULL,
  status VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id),
  product_id INTEGER REFERENCES products(id),
  quantity INTEGER NOT NULL
);

ALTER TABLE orders
ADD COLUMN total_amount INTEGER;

ALTER TABLE orders DROP COLUMN IF EXISTS amount;
ALTER TABLE orders DROP COLUMN IF EXISTS total_amount;
ALTER TABLE orders ADD COLUMN amount INTEGER NOT NULL;