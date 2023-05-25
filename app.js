const express = require('express');
const app = express();

// Custom middleware to verify working hours
const workingHoursMiddleware = (req, res, next) => {
  const date = new Date();
  const dayOfWeek = date.getDay();
  const hour = date.getHours();
  if (dayOfWeek > 0 && dayOfWeek < 6 && hour >= 9 && hour < 17) {
    // Continue to the next middleware or route handler
    next();
  } else {
    res.send('The web application is only available during working hours (Monday to Friday, from 9 to 17).');
  }
};

// Set up middleware
app.use(workingHoursMiddleware);

// Set up static files
app.use(express.static('public'));

// Set up template engine
app.set('view engine', 'ejs');

// Define routes
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/services', (req, res) => {
  res.render('services');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
