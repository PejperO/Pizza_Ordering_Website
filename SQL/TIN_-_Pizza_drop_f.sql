-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2024-01-16 23:50:16.475

-- foreign keys
ALTER TABLE `Order`
    DROP FOREIGN KEY Order_Pizza;

ALTER TABLE `Order`
    DROP FOREIGN KEY Order_User;

ALTER TABLE Pizza
    DROP FOREIGN KEY Pizza_Restaurant;

-- tables
DROP TABLE `Order`;

DROP TABLE Pizza;

DROP TABLE Restaurant;

DROP TABLE User;

-- End of file.

