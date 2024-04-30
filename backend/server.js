// Description: This file is the entry point for the application.
// It starts the server and listens on port 3000 for connections.
const express = require('express');
const app = express();
require('./config/db');
const cors = require('cors');
require('dotenv').config();
let bodyParser = require('body-parser');
const mongoose = require('mongoose');
const trackersRoutes = require('./routes/trackers');
const userRoutes = require('./routes/user');



//********Middleware*************//
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(express.json());

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

//Log Middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
})



//********Routes ******************//
app.use('/api/trackers',trackersRoutes);
app.use('/api/user', userRoutes);


app.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});



//PORT
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});