const express = require('express');
const cors = require('cors');
const { readdirSync } = require('fs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();

const app = express();
const options = {
  origin: '*',
  useSuccessStatus: 200,
};
app.use(bodyParser.json());
app.use(cors(options));
app.use(cors());

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
  });

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
