const express = require('express');
const cors = require('cors');
const { readdirSync } = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const app = express();
const options = {
  origin: '*',
  useSuccessStatus: 200,
};
app.use(cors(options));
app.use(express.json()); // Use built-in Express JSON parsing middleware

// routes
readdirSync('./routes').map((r) => app.use('/', require('./routes/' + r)));

// MongoDB connection
mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1); // Exit the process if MongoDB connection fails
  });

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
