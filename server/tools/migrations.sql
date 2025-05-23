-- SQL for a posgresql database
-- Create the users table
CREATE TABLE users (
);
-- Add indexes for performance optimization
CREATE INDEX idx_users_email ON users(email);
-- Create the products table
CREATE TABLE products (
);
-- Create the product_reviews table
CREATE TABLE product_reviews (
    id SERIAL PRIMARY KEY,
    product_id INT REFERENCES products(id) ON DELETE CASCADE,
    rating NUMERIC(3, 2) NOT NULL,
    comment TEXT,
    date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    reviewer_name VARCHAR(255),
    reviewer_email VARCHAR(255)
);
-- Add indexes for performance optimization
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_tags ON products USING GIN(tags);
CREATE INDEX idx_product_reviews_product_id ON product_reviews(product_id);
-- Create the orders table
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    order_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) NOT NULL,
    total_amount NUMERIC(10, 2) NOT NULL,
    shipping_address JSONB,
    payment_method VARCHAR(50),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
-- Create the order_items table
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(id) ON DELETE CASCADE,
    product_id INT REFERENCES products(id) ON DELETE CASCADE,
    quantity INT NOT NULL,
    price NUMERIC(10, 2) NOT NULL
);
-- Add indexes for performance optimization
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_product_id ON order_items(product_id);
-- The following SQL statements are used to allow aggregate functions in PostgREST
ALTER ROLE authenticator
SET pgrst.db_aggregates_enabled = 'true';
NOTIFY pgrst,
'reload config';