# Pizza_Ordering_Website

## Overview
This project is a comprehensive web application for ordering pizza. It includes a frontend, backend, and a database.

![image](https://github.com/user-attachments/assets/0c64563c-beb6-40f6-a946-3253f52b33ee)


## Features
### Restaurants
Restaurants are retrieved from the database and displayed as a list. Users can place orders at any of these restaurants.

![image](https://github.com/user-attachments/assets/69db320b-aa29-4403-b944-f4f03c768e72)


### User Accounts
The website allows user registration and login. Users can create accounts to place orders and manage their preferences.

### Administrator Accounts
Administrators have the ability to:

- Manage users
- Manage orders
- Manage restaurants

Administrators can also modify individual orders if necessary, such as changing the delivery address or deleting the order.

### Restaurant Accounts
Restaurant accounts have similar capabilities to administrator accounts but are limited to their respective establishments. Restaurant managers can:

- Modify their menu items
- Adjust prices
- Update order statuses
This functionality enables restaurants to maintain control over their offerings and manage their orders efficiently.


## Database Design

The database design is structured to efficiently support the application's functionality. Below is the Entity-Relationship Diagram (ERD) of the database:

![Image](https://github.com/user-attachments/assets/f1d382db-7330-45e7-b76a-b121d7437ae2)

### Design Rationale
The database is designed to normalize data, minimize redundancy, and ensure data integrity through the use of primary and foreign keys. This relational structure allows for efficient querying and management of data across the various entities involved in the pizza ordering process.

- **Normalization**: Ensures that data is stored efficiently without unnecessary duplication.
- **Referential Integrity**: Foreign keys are used to maintain consistency between related tables, ensuring that relationships between entities are correctly enforced.
- **Scalability**: The design allows for easy expansion, such as adding new tables for additional features without major changes to the existing structure.

### Capabilities
The current database design supports:

- User management and authentication.
- Restaurant and menu management.
- Order processing and tracking.
- Customization of pizza orders with various toppings.

This structure provides a robust foundation for the pizza ordering application, ensuring it can handle the necessary operations and scale as needed.

## What I Learned
- working with websites
- EJS
- javascript
- setting up a server
- built-in methods and functions
- communication between .ejs and .js files
- language changes
- Real-time communication with the data base
- UI - CSS styles
