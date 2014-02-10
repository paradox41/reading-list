'use strict';

var express  = require('express');
var app      = express();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost');

app.configure(function() {
    app.use(express.logger('dev'));
});

var Book = mongoose.model('Book', {
    title: String,
    author: String,
    numberOfPages: Number,
    dateStarted: Date,
    dateFinished: Date,
    createdOn: Date,
    updatedOn: Date
});

app.listen(8080);
console.log('App listening on port 8080')
