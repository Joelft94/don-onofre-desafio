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
('Mouse', 'Mouse Gamer RGB', 100000, '/images/mouse.jpg');



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



-- Transactions table
CREATE TABLE transactions (
  id BIGSERIAL PRIMARY KEY,
  notification_id TEXT UNIQUE NOT NULL,
  type TEXT NOT NULL,
  version INTEGER NOT NULL,
  time TIMESTAMP WITH TIME ZONE NOT NULL,
  merchant TEXT NOT NULL,
  app TEXT NOT NULL,
  env TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);