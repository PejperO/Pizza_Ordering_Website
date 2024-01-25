
DROP DATABASE IF EXISTS pizza_database;

CREATE DATABASE pizza_database;
USE pizza_database;

SELECT * FROM User;
SELECT * FROM Restaurant;
SELECT * FROM Pizza;
SELECT * FROM `Order`;

INSERT INTO User VALUES (1, 'Jan', 'Kowalski', 717071411, 'Koszykowa 86 02-008 Warszawa', 'Jan.kowalski@gmail.com', 'Jan123!', true, false);
INSERT INTO User VALUES (2, 'Ferdynand', 'Kiepski', 669392164, 'Ćwiartki 3/4 54-320 Wrocław', 'ferdek07@wp.pl', 'Grazyna321 ', false, false);

INSERT INTO Restaurant VALUES (1, 'Pizzeria Bella', 4.5, 'Koszykowa 63/2 00-667 Warszawa', 15, 'restaurant1.png');
INSERT INTO Restaurant VALUES (2, 'Pizza World', 4.2, 'Złota 59 00-120 Warszawa', 10, 'restaurant2.png');
INSERT INTO Restaurant VALUES (3, 'Pizza Heaven', 4.8, 'Puławska 73/75, 02-684 Warszawa', 7.50, 'restaurant3.png');
INSERT INTO Restaurant VALUES (4, 'Crunchy Crust Pizzeria', 4.0, 'Związku Walki Młodych 11, 02-786 Warszawa', 10, 'restaurant4.png');
INSERT INTO Restaurant VALUES (5, 'Slice of Italy', 3.9, 'Bolesławicka 31, 03-352 Warszawa', 0, 'restaurant5.png');

INSERT INTO Pizza VALUES (1, 'margherita', 24.5, 32, 1);
INSERT INTO Pizza VALUES (2, 'pepperoni', 34.5, 32, 1);
INSERT INTO Pizza VALUES (3, 'vegetarian', 44.5, 28, 1);

INSERT INTO `Order` VALUES (1, now(), 100, 2, 1, 1)

DELETE FROM Restaurant
WHERE id = '6';

ALTER TABLE `Order` MODIFY COLUMN Price double(10,2) NOT NULL;
ALTER TABLE `Order` MODIFY COLUMN ID int AUTO_INCREMENT NOT NULL;

CREATE TABLE `Order` (
    ID int  NOT NULL,
    Date timestamp  NOT NULL,
    Price double(4,2)  NOT NULL,
    quantity int  NOT NULL,
    User_ID int  NOT NULL,
    Pizza_ID int  NOT NULL,
    CONSTRAINT Order_pk PRIMARY KEY (ID)
);

CREATE TABLE Pizza (
    ID int  NOT NULL,
    Name varchar(50)  NOT NULL,
    Price double(4,2)  NOT NULL,
    Size double(3,0)  NOT NULL,
    Restaurant_ID int  NOT NULL,
    CONSTRAINT Pizza_pk PRIMARY KEY (ID)
);

CREATE TABLE Restaurant (
    ID int  NOT NULL,
    Name varchar(30)  NOT NULL,
    Rate double(3,2)  NOT NULL,
    Adres varchar(60)  NOT NULL,
    Delivery double(100,00)  NOT NULL,
    Image varchar(30) NOT NULL,
    CONSTRAINT Restaurant_pk PRIMARY KEY (ID)
);

CREATE TABLE User (
    ID int  NOT NULL,
    Name varchar(50)  NOT NULL,
    Last_Name varchar(50)  NULL,
    Phone_number int  NOT NULL,
    Address varchar(60)  NOT NULL,
    Login varchar(30)  NULL,
    Password varchar(30)  NULL,
    Is_Admin bool  NOT NULL,
    Is_Guest int  NOT NULL,
    CONSTRAINT User_pk PRIMARY KEY (ID)
);

ALTER TABLE `Order` ADD CONSTRAINT Order_Pizza FOREIGN KEY Order_Pizza (Pizza_ID)
    REFERENCES Pizza (ID);

ALTER TABLE `Order` ADD CONSTRAINT Order_User FOREIGN KEY Order_User (User_ID)
    REFERENCES User (ID);

ALTER TABLE Pizza ADD CONSTRAINT Pizza_Restaurant FOREIGN KEY Pizza_Restaurant (Restaurant_ID)
    REFERENCES Restaurant (ID);


ALTER TABLE `Order`
    DROP FOREIGN KEY Order_Pizza;

ALTER TABLE `Order`
    DROP FOREIGN KEY Order_User;

ALTER TABLE Pizza
    DROP FOREIGN KEY Pizza_Restaurant;

DROP TABLE `Order`;

DROP TABLE Pizza;

DROP TABLE Restaurant;

DROP TABLE User;
