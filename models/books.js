'use strict'

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: {type: String, required: true},
  commentcount: {type: Number, default: 0},
  comments: [String]
});

const books = mongoose.model('books', bookSchema);

module.exports = books;