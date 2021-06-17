/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

const connectDB = require('../connection.js');
const books = require('../models/books.js');

connectDB();

module.exports = function (app) {

  app.route('/api/books')
    .get(function (req, res){
      async function getBooks() {
        try {
          let getBooks = await books.find({})
          .select({comments: 0, __v: 0})
          .exec();

          return res.json(getBooks);
        } catch (error) {
          console.log(error);
        }
      }
      
      getBooks();
    })
    
    .post(function (req, res){
      async function createBook() {
        try {
          let title = req.body.title;

          if (!title) {
            return res.send('missing required field title');
          }

          let book = await new books({
            title: title
          });

          let save = await book.save();

          return res.json({
            _id: save._id,
            title: save.title
          });
        } catch (error) {
          console.log(error);
        }
      }

      createBook();
    })
    
    .delete(function(req, res) {
      async function deleteAll() {
        try {
          let result = await books.deleteMany({});

          return res.send('complete delete successful');
        } catch (error) {
          console.log(error);
        }
      }

      deleteAll();
    });


  app.route('/api/books/:id')
    .get(function (req, res) {
      async function getBookID() {
        try {
          let bookid = req.params.id;

          let book = await books.findById(bookid)
          .select({commentcount: 0, __v: 0})
          .exec();

          if (book) {
            return res.json(book);
          } else {
            return res.send('no book exists');
          }
        } catch (error) {
          console.log(error);
          return res.send('no book exists');
        }
      }

      getBookID();
    })
    
    .post(function(req, res) {
      async function postComment() {
        try {
          let bookid = req.params.id;
          let comment = req.body.comment;

          if (!comment) {
            return res.send('missing required field comment');
          }

          // Find book
          let book = await books.findById(bookid)
          .exec();

          if (!book) {
            return res.send('no book exists');
          }

          // Add comment & count to document
          await book.comments.push(comment);
          book.commentcount = book.comments.length;
          let save = await book.save();

          return res.json({
            _id: save._id,
            title: save.title,
            comments: save.comments
          });
        } catch (error) {
          console.log(error);
          return res.send('no book exists');
        }
      }

      postComment();
    })
    
    .delete(function(req, res) {
      async function deleteBook() {
        try {
          let bookid = req.params.id;

          // Find book
          let book = await books.findByIdAndDelete(bookid).exec();

          if (!book) {
            return res.send('no book exists');
          }

          return res.send('delete successful');
        } catch (error) {
          console.log(error);
          return res.send('no book exists');
        }
      }

      deleteBook();   
    }); 
};
