CREATE SCHEMA IF NOT EXISTS store;

CREATE TABLE store.client

(
    id            uuid PRIMARY KEY,
    name          VARCHAR(100),
    surname       VARCHAR(100),
    date_of_birth DATE,
    email_address VARCHAR(100),
    password      VARCHAR(50)
);

CREATE TABLE store.address
(
    id          uuid PRIMARY KEY,
    client_id   uuid,
    country     VARCHAR(50),
    city        VARCHAR(50),
    postal_code INT,
    street      VARCHAR(100),
    home        INT,
    apartment   VARCHAR(10),
    FOREIGN KEY (client_id) REFERENCES store.client(id)
);

CREATE TABLE store.delivery_method
(
    id     VARCHAR(50) PRIMARY KEY,
    description VARCHAR(200)
);

CREATE TABLE store.payment_method
(
    id     VARCHAR(50) PRIMARY KEY,
    description VARCHAR(200)
);

CREATE TABLE store.category
(
    id       SERIAL PRIMARY KEY,
    name VARCHAR(50)
);

ALTER SEQUENCE store.category_id_seq RESTART WITH 6;

CREATE TABLE store.product
(
    id                uuid  PRIMARY KEY,
    category_id       int,
    title             VARCHAR(100),
    price             INT,
    parameters        VARCHAR(100),
    weight            VARCHAR(50),
    volume            VARCHAR(50),
    quantity_in_stock INT,
    image_url          VARCHAR(250),
    FOREIGN KEY (category_id) REFERENCES store.category (id)
);

CREATE TABLE store.payment_status
(
    id VARCHAR(50) PRIMARY KEY,
    description VARCHAR(200)
);

CREATE TABLE store.order_status
(
    id VARCHAR(50) PRIMARY KEY,
    description VARCHAR(200)
);

CREATE TABLE store.order
(
    id               uuid PRIMARY KEY,
    client_id        uuid,
    address_id       uuid,
    payment_method   VARCHAR(50),
    delivery_method  VARCHAR(50),
    payment_status   VARCHAR(50),
    order_status     VARCHAR(50),
    FOREIGN KEY (client_id) REFERENCES store.client (id),
    FOREIGN KEY (address_id) REFERENCES store.address (id),
    FOREIGN KEY (payment_method) REFERENCES store.payment_method (id),
    FOREIGN KEY (delivery_method) REFERENCES store.delivery_method (id),
    FOREIGN KEY (payment_status) REFERENCES store.payment_status (id),
    FOREIGN KEY (order_status) REFERENCES store.order_status (id)
);

CREATE TABLE store.order_product
(
    order_id uuid,
    product_id uuid,
    FOREIGN KEY (order_id) REFERENCES store.order(id),
    FOREIGN KEY (product_id) REFERENCES store.product(id),
    PRIMARY KEY (order_id, product_id)
);

CREATE TABLE store.employee
(
    id            uuid PRIMARY KEY,
    name          VARCHAR(100),
    surname       VARCHAR(100),
    date_of_birth DATE,
    email_address VARCHAR(100),
    password      VARCHAR(50)
);