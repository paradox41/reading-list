'use strict';

var express  = require('express');
var mongo    = require('mongodb');
var mongoose = require('mongoose');

require('express-namespace');

var app      = express();

var mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/reading-list/';

mongoose.connect(mongoUri);

app.configure(function() {
    app.use(express.static(__dirname + '/app'));
    app.use(express.bodyParser());
    app.use(express.logger('dev'));
});

var Book = mongoose.model('Book', {
    title: String,
    author: String,
    number_of_pages: Number,
    date_started: Date,
    date_finished: Date,
    created_on: Date,
    updated_on: Date
});

// api stuff
app.namespace('/api', function() {
    // get all books
    app.get('/books', function(request, response) {
        Book.find(function(error, books) {
            // if there is an error, send the error
            if (error) {
                response.send(error);
            }

            // otherwise just send the books json
            response.json(books);
        });
    });

    // get one book
    app.get('/books/:book_id', function(request, response) {
        Book.findById(request.params.book_id).exec(function(error, book) {
            if (error) {
                response.send(error);
            }

            response.json(book);
        });
    });

    // create a new book
    app.post('/books', function(request, response) {
        Book.create({
            title: request.body.title,
            author: request.body.author,
            number_of_pages: request.body.number_of_pages,
            date_started: request.body.date_started,
            date_finished: request.body.date_finished,
            created_on: request.body.created_on,
            updated_on: new Date()
        }, function(error, book) {
            if (error) {
                response.send(error);
            }

            Book.findById(book._id).exec(function(error, book) {
                if (error) {
                    response.send(error);
                }

                response.json(book);
            });
        });
    });

    // update a book
    app.post('/books/:book_id', function(request, response) {
        Book.findByIdAndUpdate(request.params.book_id, {
            title: request.body.title,
            author: request.body.author,
            number_of_pages: request.body.number_of_pages,
            date_started: request.body.date_started,
            date_finished: request.body.date_finished,
            updated_on: new Date()
        }, function(error, book) {
            if (error) {
                response.send(error);
            }

            response.json(book);
        });
    });

    // delete a book
    app.delete('/books/:book_id', function(request, response) {
        Book.remove({
            _id: request.params.book_id
        }, function(error, book) {
            if (error) {
                response.send(error);
            }

            response.json({
                'status': 'success'
            });
        });
    });
});

// Start the app by listening on <port>
var port = process.env.PORT;
app.listen(port);
console.log('Express app started on port ' + port);

// Initializing logger
// logger.init(app, passport, mongoose);

// Expose app
exports = module.exports = app;
// app.listen(8080);
// console.log('App listening on port 8080')
