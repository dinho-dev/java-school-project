INSERT INTO store.client (id, name, surname, date_of_birth, email_address, password)
VALUES ('aa5366f0-aa25-11ed-afa1-0242ac120002', 'John', 'Doe', '1990-01-01', 'johndoe@email.com', 'password123'),
       ('aa536f42-aa25-11ed-afa1-0242ac120002', 'Jane', 'Smith', '1992-03-05', 'janesmith@email.com', 'password456'),
       ('aa537104-aa25-11ed-afa1-0242ac120002', 'Jim', 'Brown', '1989-12-25', 'jimbrown@email.com', 'password789'),
       ('aa5373e0-aa25-11ed-afa1-0242ac120002', 'Sarah', 'Johnson', '1995-07-15', 'sarahjohnson@email.com',
        'password453'),
       ('aa53756c-aa25-11ed-afa1-0242ac120002', 'Michael', 'Lee', '1987-09-21', 'michaellee@email.com', 'password199'),
       ('aa5376a6-aa25-11ed-afa1-0242ac120002', 'Emily', 'Wilson', '1998-05-12', 'emilywilson@email.com',
        'password544'),
       ('aa53780c-aa25-11ed-afa1-0242ac120002', 'William', 'Jones', '1985-03-28', 'williamjones@email.com',
        'password128'),
       ('aa53792e-aa25-11ed-afa1-0242ac120002', 'Grace', 'Miller', '1991-11-03', 'gracemiller@email.com',
        'password387'),
       ('aa537a6c-aa25-11ed-afa1-0242ac120002', 'David', 'Davis', '1999-01-25', 'daviddavis@email.com', 'password512'),
       ('aa537b8e-aa25-11ed-afa1-0242ac120002', 'Linda', 'Wilson', '1988-12-05', 'lindawilson@email.com',
        'password831');

INSERT INTO store.address (id, client_id, country, city, postal_code, street, home, apartment)
VALUES ('cdf71b60-aa25-11ed-afa1-0242ac120002', 'aa5366f0-aa25-11ed-afa1-0242ac120002', 'USA', 'New York', '10001',
        'Main St', '123', '5a'),
       ('cdf7218c-aa25-11ed-afa1-0242ac120002', 'aa536f42-aa25-11ed-afa1-0242ac120002', 'USA', 'Los Angeles', '90001',
        'Oak Ave', '456', '2'),
       ('cdf722ea-aa25-11ed-afa1-0242ac120002', 'aa537104-aa25-11ed-afa1-0242ac120002', 'USA', 'Chicago', '60601',
        'Pine St', '789', '3a'),
       ('cdf72434-aa25-11ed-afa1-0242ac120002', 'aa5373e0-aa25-11ed-afa1-0242ac120002', 'USA', 'San Francisco', '94101',
        'Elm St', '234', '4b'),
        ('cdf7257a-aa25-11ed-afa1-0242ac120002', 'aa53756c-aa25-11ed-afa1-0242ac120002', 'USA', 'Seattle', '98101',
        'Cedar Rd', '567', '12'),
       ('cdf726c0-aa25-11ed-afa1-0242ac120002', 'aa5376a6-aa25-11ed-afa1-0242ac120002', 'USA', 'Boston', '02101',
        'Maple Ave', '890', '1'),
       ('cdf72806-aa25-11ed-afa1-0242ac120002', 'aa53780c-aa25-11ed-afa1-0242ac120002', 'USA', 'Philadelphia', '19101',
        'Spruce St', '111', '8c'),
       ('cdf7294c-aa25-11ed-afa1-0242ac120002', 'aa53792e-aa25-11ed-afa1-0242ac120002', 'USA', 'Miami', '33101',
        'Palm Blvd', '222', '15d'),
       ('cdf72a92-aa25-11ed-afa1-0242ac120002', 'aa537a6c-aa25-11ed-afa1-0242ac120002', 'USA', 'Houston', '77001',
        'Ashford St', '333', '7'),
       ('cdf72bd8-aa25-11ed-afa1-0242ac120002', 'aa537b8e-aa25-11ed-afa1-0242ac120002', 'USA', 'Dallas', '75201',
        'Willow Dr', '444', '22');

INSERT INTO store.delivery_method (id, description)
VALUES ('International', 'Takes from 1 to 3 weeks'),
       ('Pick-up', 'Self pick-up'),
       ('DHL', 'delivery to address');

INSERT INTO store.payment_method (id, description)
VALUES ('Cash', 'Available only for self pick-up'),
       ('By card', 'Payment with credit or debit card');

INSERT INTO store.payment_status (id, description)
VALUES ('Paid', 'The payment is successful. However, the funds are still pending and will not yet be available ' ||
                'for withdrawal or transfers'),
       ('Pending', 'A payment has been created successfully and awaiting payment action from end-customer');

INSERT INTO store.order_status (id, description)
VALUES ('pending payment', 'Only applicable to payment methods with "delayed success confirmation'),
       ('pending shipment', 'The order is ready but has not yet been sent.'),
       ('shipped', 'The order has been shipped from the warehouse and is on its way to the customer.'),
       ('delivered', 'The delivery has been completed.');

INSERT INTO store.order (id, client_id, address_id, payment_method, delivery_method, payment_status,
                         order_status)
VALUES ('44235aac-aa25-11ed-afa1-0242ac120002', 'aa5366f0-aa25-11ed-afa1-0242ac120002',
        'cdf71b60-aa25-11ed-afa1-0242ac120002', 'Cash', 'Pick-up', 'Paid', 'delivered'),
       ('44235f3e-aa25-11ed-afa1-0242ac120002', 'aa536f42-aa25-11ed-afa1-0242ac120002',
        'cdf7218c-aa25-11ed-afa1-0242ac120002', 'By card', 'DHL', 'Pending', 'pending payment'),
       ('44236056-aa25-11ed-afa1-0242ac120002', 'aa537104-aa25-11ed-afa1-0242ac120002',
        'cdf722ea-aa25-11ed-afa1-0242ac120002', 'By card', 'DHL', 'Pending', 'pending payment'),
       ('44236212-aa25-11ed-afa1-0242ac120002', 'aa5373e0-aa25-11ed-afa1-0242ac120002',
        'cdf72434-aa25-11ed-afa1-0242ac120002', 'By card', 'International', 'Paid', 'shipped'),
       ('44236326-aa25-11ed-afa1-0242ac120002', 'aa53756c-aa25-11ed-afa1-0242ac120002',
        'cdf7257a-aa25-11ed-afa1-0242ac120002', 'Cash', 'Pick-up', 'Pending', 'shipped'),
       ('4423641c-aa25-11ed-afa1-0242ac120002', 'aa5376a6-aa25-11ed-afa1-0242ac120002',
        'cdf726c0-aa25-11ed-afa1-0242ac120002', 'By card', 'DHL', 'Paid', 'delivered'),
       ('4423650a-aa25-11ed-afa1-0242ac120002', 'aa53780c-aa25-11ed-afa1-0242ac120002',
        'cdf72806-aa25-11ed-afa1-0242ac120002', 'Cash', 'Pick-up', 'Pending', 'shipped'),
       ('442365f0-aa25-11ed-afa1-0242ac120002', 'aa53792e-aa25-11ed-afa1-0242ac120002',
        'cdf7294c-aa25-11ed-afa1-0242ac120002', 'By card', 'International', 'Pending', 'pending payment'),
       ('442366d8-aa25-11ed-afa1-0242ac120002', 'aa537a6c-aa25-11ed-afa1-0242ac120002',
        'cdf72a92-aa25-11ed-afa1-0242ac120002', 'By card', 'DHL', 'Paid', 'delivered'),
       ('442367c2-aa25-11ed-afa1-0242ac120002', 'aa537b8e-aa25-11ed-afa1-0242ac120002',
        'cdf72bd8-aa25-11ed-afa1-0242ac120002', 'By card', 'International', 'Paid', 'pending shipment');

INSERT INTO store.category (id, category)
VALUES (1, 'Laptops'),
       (2, 'Smartphones'),
       (3, 'Headphones'),
       (4, 'Smartwatches'),
       (5, 'Gaming consoles');

INSERT INTO store.product (id, title, price, category_id, parameters, weight, volume, quantity_in_stock)
VALUES ('4e4ffcfe-aa27-11ed-afa1-0242ac120002', 'Apple MacBook Pro', 1500, 1, '13 inch, 256GB SSD, 8GB RAM',
        '3lb', '14x9x1 in', '20'),
       ('4e500078-aa27-11ed-afa1-0242ac120002', 'Samsung Galaxy S21', 800, 2, '6.2 inch, 128GB, 8GB RAM',
        '6oz', '6x3x1 in', '50'),
       ('4e5001ea-aa27-11ed-afa1-0242ac120002', 'Dell XPS 15', 1700, 1, '15 inch, 512GB SSD, 16GB RAM',
        '4lb', '14x9x1 in', '30'),
       ('4e50033a-aa27-11ed-afa1-0242ac120002', 'Sony WH-1000XM4', 350, 3, 'Over-ear, Bluetooth, Noise-cancelling',
        '0.8lb', '8x7x2 in', '10'),
       ('4e5004a6-aa27-11ed-afa1-0242ac120002', 'Apple iPhone 13', 1000, 2, '6.1 inch, 128GB, 5G',
        '5.8oz', '5.78x2.82x0.3 in', '25'),
       ('4e5005f8-aa27-11ed-afa1-0242ac120002', 'Samsung Galaxy Watch 4', 250, 4, '40mm, Black, Bluetooth',
        '1.6oz', '1.36x1.36x0.39 in', '15'),
       ('4e500742-aa27-11ed-afa1-0242ac120002', 'Xbox Series X', 500, 5, '1TB SSD, 12 TFLOPS',
        '9.8lb', '15.1x15.1x6 in', '5'),
       ('4e5008aa-aa27-11ed-afa1-0242ac120002', 'ASUS ROG Zephyrus G15', 2000, 1, '15.6 inch, 1TB SSD, 32GB RAM',
        '4.6lb', '14.2x9.9x0.8 in', '10'),
       ('4e5009f8-aa27-11ed-afa1-0242ac120002', 'Bose QuietComfort Earbuds', 250, 3, 'True wireless, Noise-cancelling',
        '0.3lb', '2.5x2.5x1.5 in', '8'),
       ('4e500b46-aa27-11ed-afa1-0242ac120002', 'Google Pixel 6', 700, 2, '6.4 inch, 128GB, 5G',
        '6.7oz', '6.3x2.9x0.3 in', '30');

INSERT INTO store.employee (id, name, surname, date_of_birth, email_address, password)
VALUES ('7d247b2c-aa27-11ed-afa1-0242ac120002', 'Roberta', 'Hood', '1980-01-01', 'robertahood@gmail.com', 'password1'),
       ('7d247dd4-aa27-11ed-afa1-0242ac120002', 'Harry', 'Barnett', '1990-05-15', 'harrybarnett@gmail.com',
        'password2'),
       ('7d247f3c-aa27-11ed-afa1-0242ac120002', 'Jaydon', 'Robinson', '1975-11-30', 'jaydonrobinson@gmail.com',
        'password3');

