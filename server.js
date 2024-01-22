const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;
const path = require('path');
const url = require('url');

const methodOverride = require('method-override');
app.use(methodOverride('_method'));


const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'pizza_database',
  connectionLimit: 10,
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));



app.get('/', (req, res) => {
  pool.query('SELECT * FROM Restaurant', (error, results) => {
    if (error) {
      throw error;
    }

    const restaurantsWithImages = results.map(restaurant => ({
      ...restaurant,
      image: `/images/lokal${restaurant.ID}.png`, // Zakładam, że ID restauracji jest unikalne
    }));

    res.render('main', { restaurants: restaurantsWithImages });
  });
});

app.get('/order/:restaurantId', (req, res) => {
  const restaurantId = req.params.restaurantId;

  pool.query('SELECT * FROM Restaurant WHERE ID = ?', [restaurantId], (error, results) => {
    if (error) {
      throw error;
    }

    const restaurant = results[0];

    pool.query('SELECT * FROM Pizza WHERE Restaurant_ID = ?', [restaurantId], (error, pizzaResults) => {
      if (error) {
        throw error;
      }

      res.render('order', { restaurant, pizzas: pizzaResults, deliveryCost: restaurant.Delivery });

    });
  });
});

app.get('/editUser/:userId', (req, res) => {
  const userId = req.params.userId;

  pool.query('SELECT * FROM User WHERE ID = ?', [userId], (error, results) => {
    if (error) {
      throw error;
    }

    const user = results[0];

    res.render('edit_database', { user });
  });
});

app.get('/editOrder/:orderId', (req, res) => {
  const orderId = req.params.orderId;

  const query = 'SELECT `Order`.ID, `Order`.Date, `Order`.Price, `Order`.quantity, Pizza.Name AS Pizza_Name, Pizza.ID AS Pizza_ID, Restaurant.Name AS Restaurant_Name ' +
      'FROM `Order` ' +
      'JOIN Pizza ON `Order`.Pizza_ID = Pizza.ID ' +
      'JOIN Restaurant ON Pizza.Restaurant_ID = Restaurant.ID ' +
      'WHERE `Order`.ID = ?';
  pool.query(query, [orderId], (error, orderResults) => {
    if (error) {
      throw error;
    }

    const order = orderResults[0];

    res.render('edit_order', { order });
  });
});

app.post('/editOrder/:orderId', (req, res) => {
  const orderId = req.params.orderId;
  const newDate = req.body.date;
  const newPrice = req.body.price;
  const newQuantity = req.body.quantity;
  const newPizza = req.body.pizza;
  const newRestaurant = req.body.restaurant;

  const updateQuery = 'UPDATE `Order` ' +
      'SET Date = ?, Price = ?, quantity = ? ' +
      'WHERE ID = ?';
  pool.query(updateQuery, [newDate, newPrice, newQuantity, orderId], (error) => {
    if (error) {
      throw error;
    }

    res.redirect('/detailsUser/<%= user.ID %>');
  });
});

app.delete('/deleteUser/:userId', (req, res) => {
  const userId = req.params.userId;

  pool.query('DELETE FROM User WHERE ID = ?', [userId], (error, results) => {
    if (error) {
      throw error;
    }

    console.log(`User with ID ${userId} has been deleted.`);
    res.send('User deleted successfully.');
  });
});

app.get('/database', (req, res) => {
  const { sortColumn, sortOrder, searchInput } = req.query;

  let query = 'SELECT * FROM User';
  let params = [];

  if (searchInput) {
    query += ' WHERE Name LIKE ? OR Last_Name LIKE ? OR Phone_number LIKE ? OR Address LIKE ? OR Login LIKE ?';
    params = Array(5).fill(`%${searchInput}%`);
  }

  if (sortColumn && sortOrder) {
    query += ` ORDER BY ${sortColumn} ${sortOrder}`;
  }

  pool.query(query, params, (error, results) => {
    if (error) {
      throw error;
    }

    const users = results;

    res.render('database', { users, deleteEndpoint: '/deleteUser/' });
  });
});

app.get('/detailsUser/:userId', (req, res) => {
  const userId = req.params.userId;

  pool.query('SELECT * FROM User WHERE ID = ?', [userId], (error, userResults) => {
    if (error) {
      throw error;
    }

    const user = userResults[0];

    const query = 'SELECT `Order`.ID, `Order`.Date, `Order`.Price, `Order`.quantity, Pizza.Name AS Pizza_Name, Pizza.ID AS Pizza_ID, Restaurant.Name AS Restaurant_Name ' +
        'FROM `Order` ' +
        'JOIN Pizza ON `Order`.Pizza_ID = Pizza.ID ' +
        'JOIN Restaurant ON Pizza.Restaurant_ID = Restaurant.ID ' +
        'WHERE User_ID = ?';
    pool.query(query, [userId], (error, orderResults) => {
      if (error) {
        throw error;
      }

      const userOrders = orderResults;

      res.render('details_database', { user, userOrders });
    });
  });
});

app.post('/editUser/:userId', (req, res) => {
  const userId = req.params.userId;
  const { firstName, lastName, email, street } = req.body;

  pool.query('UPDATE User SET Name = ?, Last_Name = ?, Login = ?, Address = ? WHERE ID = ?',
      [firstName, lastName, email, street, userId],
      (error, results) => {
        if (error) {
          throw error;
        }

        console.log(`User with ID ${userId} has been updated.`);
        res.redirect('/database');
      }
  );
});

app.post('/order_final/:restaurantId', (req, res) => {
  const restaurantId = req.params.restaurantId;
  const pizzaType = req.body['pizza-type'];
  const quantity = req.body.quantity;
  const name = req.body.name;
  const telNumber = req.body.tel_number;
  const deliveryAddress = req.body.delivery_address;
  const deliveryCost = req.body.deliveryCost;

  pool.query('SELECT * FROM Pizza WHERE ID = ?', [pizzaType], (error, pizzaResults) => {
    if (error) {
      throw error;
    }

    const pizza = pizzaResults[0];

    pool.query('SELECT * FROM Restaurant WHERE ID = ?', [restaurantId], (error, restaurantResults) => {
      if (error) {
        throw error;
      }

      const restaurant = restaurantResults[0];

      pool.query('SELECT * FROM User WHERE Name = ?', [req.body.name], (error, userResult) => {
        if (error) {
          throw error;
        }

      const user = userResult[0];

      const totalCost = (pizza.Price * quantity + parseFloat(deliveryCost)).toFixed(2);

      /*pool.query(
          'INSERT INTO `Order` (Date, Price, quantity, User_ID, Pizza_ID) VALUES (NOW(), totalCost, quantity, user.ID, pizza.ID)',
          (error, orderInsertResults) => {
            if (error) {
              throw error;
          }

            const orderId = orderInsertResults.insertId;

            res.render('order_final', {
              restaurant: { ...restaurant, ID: restaurantId },
              order: {
                orderId,
                pizza,
                quantity,
                name,
                telNumber,
                deliveryAddress,
                deliveryCost: parseFloat(deliveryCost),
                totalCost,
              },
            });
          }
      );

       */

      res.render('order_final', {
        restaurant: { ...restaurant, ID: restaurantId },
        order: {
          //orderId,
          pizza,
          quantity,
          name,
          telNumber,
          deliveryAddress,
          deliveryCost: parseFloat(deliveryCost),
          totalCost,
        },
      });
    });
  });
});
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
