const mongoose = require('mongoose');

// Load environment variables for connection details
const {
  MONGODB_ATLAS_USER,
  MONGODB_ATLAS_PASSWORD,
  MONGODB_ATLAS_DATABASE,
} = process.env;

// MongoDB Atlas connection string with dynamic user, password, and database
const url = `mongodb+srv://${MONGODB_ATLAS_USER}:${MONGODB_ATLAS_PASSWORD}@cluster0.4mlkv.mongodb.net/${MONGODB_ATLAS_DATABASE}?retryWrites=true&w=majority`;

const connectionParams = {
  useNewUrlParser: true,
};

const connectToMongo = () => {
  mongoose.connect(url, connectionParams)
    .then(() => {
      console.log('Connected to the database');
    })
    .catch((err) => {
      console.error(`Error connecting to the database.\n${err}`);
    });
};

module.exports = connectToMongo;
