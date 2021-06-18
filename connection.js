'use strict'

const mongoose = require('mongoose');

// Set up MongoDB connection
async function connectDB() {
  try {
    await mongoose.connect(process.env.DB, {useNewUrlParser: true, useUnifiedTopology: true});

    console.log('Connected to database')
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;