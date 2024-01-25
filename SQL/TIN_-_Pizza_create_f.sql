-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2024-01-16 23:50:16.475

-- tables
-- Table: Order
CREATE TABLE `Order` (
    ID int  NOT NULL,
    Date timestamp  NOT NULL,
    Price double(4,2)  NOT NULL,
    quantity int  NOT NULL,
    User_ID int  NOT NULL,
    Pizza_ID int  NOT NULL,
    CONSTRAINT Order_pk PRIMARY KEY (ID)
);

-- Table: Pizza
CREATE TABLE Pizza (
    ID int  NOT NULL,
    Name varchar(50)  NOT NULL,
    Price double(4,2)  NOT NULL,
    Size double(3,0)  NOT NULL,
    Restaurant_ID int  NOT NULL,
    CONSTRAINT Pizza_pk PRIMARY KEY (ID)
);

-- Table: Restaurant
CREATE TABLE Restaurant (
    ID int  NOT NULL,
    Name varchar(30)  NOT NULL,
    Rate double(1,1)  NOT NULL,
    Adres varchar(60)  NOT NULL,
    Delivery double(100,00)  NOT NULL,
    CONSTRAINT Restaurant_pk PRIMARY KEY (ID)
);

-- Table: User
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

-- foreign keys
-- Reference: Order_Pizza (table: Order)
ALTER TABLE `Order` ADD CONSTRAINT Order_Pizza FOREIGN KEY Order_Pizza (Pizza_ID)
    REFERENCES Pizza (ID);

-- Reference: Order_User (table: Order)
ALTER TABLE `Order` ADD CONSTRAINT Order_User FOREIGN KEY Order_User (User_ID)
    REFERENCES User (ID);

-- Reference: Pizza_Restaurant (table: Pizza)
ALTER TABLE Pizza ADD CONSTRAINT Pizza_Restaurant FOREIGN KEY Pizza_Restaurant (Restaurant_ID)
    REFERENCES Restaurant (ID);

-- End of file.

