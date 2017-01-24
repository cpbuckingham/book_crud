'use strict'

const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.get('/', (req, res) => {
  knex('authors').then((authors) => {
    res.render("authors/all", {authors:authors});
  });
});

router.get('/new', (req, res) => {
  res.render('authors/new')
})

router.get('/:id', (req, res) => {
  let authID = req.params.id;
  knex('authors').where('id', authID).first().then(function (author) {
    res.render('authors/single', {author:author});
  })
})

module.exports = router;
