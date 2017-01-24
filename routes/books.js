'use strict'

const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.get('/', (req, res) => {
  knex('books').then((books) => {
    res.render("books/all", {books:books});
  });
});

router.post('/', function(req, res, next) {
  knex('books').insert({
    title: req.body.title,
    genre: req.body.genre,
    description: req.body.description,
    cover_url: req.body.cover_url
  }).then(function (){
    res.redirect('/books')
  })
})

router.get('/new', (req, res) => {
  res.render('books/new')
})

router.get('/:id', function (req, res, next) {
  let bookID = req.params.id;
  knex('books').where('id', bookID).first().then(function (book) {
    res.render('books/single', {book:book});
  })
})


module.exports = router;
