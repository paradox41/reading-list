'use strict';

var express  = require('express');
var app      = express();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost');

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
app.get('/api/books', function(request, response) {

    Book.find(function(error, books) {
        // if there is an error, send the error
        if (error) {
            response.send(error);
        }

        // otherwise just send the books json
        response.json(books);
    });
});

app.post('/api/books', function(request, response) {

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

        Book.find(function(error, books) {
            if (error) {
                response.send(error);
            }

            response.json(books);
        });
    });
});

app.delete('/api/books/:book_id', function(request, response) {
    Book.remove({
        _id: request.params.book_id
    }, function(error, book) {
        if (error) {
            response.send(error);
        }
    });
});

app.listen(8080);
console.log('App listening on port 8080')
