INSERT INTO store.user (id, firstname, lastname, date_of_birth, email, password, role)
VALUES ('aa5366f0-aa25-11ed-afa1-0242ac120002', 'John', 'Doe', '1990-01-01', 'admin@admin.com',
        'admin', 'ADMIN'),
       ('aa536f42-aa25-11ed-afa1-0242ac120002', 'Jane', 'Smith', '1992-03-05', 'janesmith@email.com',
        'password456', 'USER'),
       ('aa537104-aa25-11ed-afa1-0242ac120002', 'Jim', 'Brown', '1989-12-25', 'jimbrown@email.com',
        'password789', 'USER'),
       ('aa5373e0-aa25-11ed-afa1-0242ac120002', 'Sarah', 'Johnson', '1995-07-15', 'sarahjohnson@email.com',
        'password453', 'USER'),
       ('aa53756c-aa25-11ed-afa1-0242ac120002', 'Michael', 'Lee', '1987-09-21', 'michaellee@email.com',
        'password199', 'USER'),
       ('aa5376a6-aa25-11ed-afa1-0242ac120002', 'Emily', 'Wilson', '1998-05-12', 'emilywilson@email.com',
        'password544', 'USER'),
       ('aa53780c-aa25-11ed-afa1-0242ac120002', 'William', 'Jones', '1985-03-28', 'williamjones@email.com',
        'password128', 'USER'),
       ('aa53792e-aa25-11ed-afa1-0242ac120002', 'Grace', 'Miller', '1991-11-03', 'gracemiller@email.com',
        'password387', 'USER'),
       ('aa537a6c-aa25-11ed-afa1-0242ac120002', 'David', 'Davis', '1999-01-25', 'daviddavis@email.com',
        'password512', 'USER'),
       ('aa537b8e-aa25-11ed-afa1-0242ac120002', 'Linda', 'Wilson', '1988-12-05', 'lindawilson@email.com',
        'password831', 'USER');

INSERT INTO store.address (id, user_id, country, city, postal_code, street, home, apartment)
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

INSERT INTO store.order (id, user_id, address_id, payment_method, delivery_method, payment_status,
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

INSERT INTO store.category (id, name)
VALUES (1, 'Laptops'),
       (2, 'Smartphones'),
       (3, 'Headphones'),
       (4, 'Smartwatches'),
       (5, 'Gaming consoles');

INSERT INTO store.product (id, title, price, category_id, parameters, weight, volume, quantity_in_stock, image_url)
VALUES ('4e4ffcfe-aa27-11ed-afa1-0242ac120002', 'Apple MacBook Pro', 1500, 1, '13 inch, 256GB SSD, 8GB RAM',
        '1.36kg', '14x9x1 in', '20', 'https://img.mvideo.ru/Pdb/30053805b.jpg'),
       ('4e500078-aa27-11ed-afa1-0242ac120002', 'Samsung Galaxy S21', 800, 2, '6.2 inch, 128GB, 8GB RAM',
        '0.170kg', '6x3x1 in', '50', 'https://items.s1.citilink.ru/1794238_v01_b.jpg'),
       ('4e5001ea-aa27-11ed-afa1-0242ac120002', 'Dell XPS 15', 1700, 1, '15 inch, 512GB SSD, 16GB RAM',
        '1.81kg', '14x9x1 in', '30', 'https://img.pccomponentes.com/articles/1029/10294662/7195-dell-xps-15-9520-intel-core-i7-12700h-16gb-1tb-ssd-rtx3050-ti-156-review.jpg'),
       ('4e50033a-aa27-11ed-afa1-0242ac120002', 'Sony WH-1000XM4', 350, 3, 'Over-ear, Bluetooth, Noise-cancelling',
        '0.363kg', '8x7x2 in', '10', 'https://p.turbosquid.com/ts-thumb/Lv/713MJ7/i7tUUKGD/sony_1000xm4_render00_black/png/1590943750/600x600/fit_q87/35699212c93366353098916e565abda37279c89b/sony_1000xm4_render00_black.jpg'),
       ('4e5004a6-aa27-11ed-afa1-0242ac120002', 'Apple iPhone 13', 1000, 2, '6.1 inch, 128GB, 5G',
        '0.164kg', '5.78x2.82x0.3 in', '25', 'https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/71dpTXFz+dL._AC_SX466_.jpg'),
       ('4e5005f8-aa27-11ed-afa1-0242ac120002', 'Samsung Galaxy Watch 4', 250, 4, '40mm, Black, Bluetooth',
        '0.045kg', '1.36x1.36x0.39 in', '15', 'https://image-us.samsung.com/SamsungUS/configurator/watch4_bands/W4_40mm_02_BLK_Sport_BLK-MB-720x720.jpg'),
       ('4e500742-aa27-11ed-afa1-0242ac120002', 'Xbox Series X', 500, 5, '1TB SSD, 12 TFLOPS',
        '4.45kg', '15.1x15.1x6 in', '5', 'https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/61nq7mC0tHL._AC_SX522_.jpg'),
       ('4e5008aa-aa27-11ed-afa1-0242ac120002', 'ASUS ROG Zephyrus G15', 2000, 1, '15.6 inch, 1TB SSD, 32GB RAM',
        '1.9kg', '14.2x9.9x0.8 in', '10', 'https://img.pccomponentes.com/articles/79/796622/3625-asus-rog-zephyrus-g15-ga503qs-hq004t-amd-ryzen-9-5900hs-32gb-1tb-ssd-rtx-3080-156-mejor-precio.jpg'),
       ('4e5009f8-aa27-11ed-afa1-0242ac120002', 'Bose QuietComfort Earbuds', 250, 3, 'True wireless, Noise-cancelling',
        '0.017kg', '2.5x2.5x1.5 in', '8', 'https://fotosuraj.com/34433-large_default/bose-quietcomfort-earbuds-ii.jpg'),
       ('4e500b46-aa27-11ed-afa1-0242ac120002', 'Google Pixel 6', 700, 2, '6.4 inch, 128GB, 5G',
        '0.207kg', '6.3x2.9x0.3 in', '30', 'https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/71SGl7xwR-L._AC_SS450_.jpg');

INSERT INTO store.order_product (order_id, product_id)
VALUES ('44235aac-aa25-11ed-afa1-0242ac120002', '4e4ffcfe-aa27-11ed-afa1-0242ac120002'),
       ('44235aac-aa25-11ed-afa1-0242ac120002', '4e50033a-aa27-11ed-afa1-0242ac120002'),
       ('44235f3e-aa25-11ed-afa1-0242ac120002', '4e500b46-aa27-11ed-afa1-0242ac120002'),
        ('44235aac-aa25-11ed-afa1-0242ac120002', '4e5009f8-aa27-11ed-afa1-0242ac120002'),
       ('44235f3e-aa25-11ed-afa1-0242ac120002', '4e5008aa-aa27-11ed-afa1-0242ac120002'),
       ('44236056-aa25-11ed-afa1-0242ac120002', '4e500742-aa27-11ed-afa1-0242ac120002'),
       ('44236212-aa25-11ed-afa1-0242ac120002', '4e5005f8-aa27-11ed-afa1-0242ac120002'),
        ('44236212-aa25-11ed-afa1-0242ac120002', '4e5004a6-aa27-11ed-afa1-0242ac120002'),
        ('44236212-aa25-11ed-afa1-0242ac120002', '4e50033a-aa27-11ed-afa1-0242ac120002'),
       ('44236326-aa25-11ed-afa1-0242ac120002', '4e5004a6-aa27-11ed-afa1-0242ac120002'),
       ('4423641c-aa25-11ed-afa1-0242ac120002', '4e5001ea-aa27-11ed-afa1-0242ac120002'),
       ('4423650a-aa25-11ed-afa1-0242ac120002', '4e5005f8-aa27-11ed-afa1-0242ac120002'),
       ('442365f0-aa25-11ed-afa1-0242ac120002', '4e500742-aa27-11ed-afa1-0242ac120002'),
       ('442366d8-aa25-11ed-afa1-0242ac120002', '4e5008aa-aa27-11ed-afa1-0242ac120002'),
       ('442367c2-aa25-11ed-afa1-0242ac120002', '4e50033a-aa27-11ed-afa1-0242ac120002');

