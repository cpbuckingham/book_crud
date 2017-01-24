'use strict'
const expect = require( 'chai' ).expect;
const app = require( '../server' );
const request = require( 'supertest' )( app );
const morgan = require( 'morgan' );
const knex = require('../db/knex');

describe('Test the test', function () {
 it('should pass the test', function () {
    expect(true).to.equal(true)
 })
})

describe('Landing Page', function () {
 it('should display the landing page', function (done) {
   request.get('/')
          .expect(200)
          .end(function (err, res) {
            if(err){
              done(err);
            }
            expect(res.text).to.contain("Books")
            done();
          })
 })
})


describe('books', function () {
 it('should display all of the books', function (done) {
   request.get('/books')
          .expect(200)
          .end(function(err, res) {
            if(err){
              done(err)
            }
            expect(res.text).to.contain("Python In A Nutshell")
            done();
          })
 })
 it('should display a single user', function (done) {
   request.get('/books/1')
          .expect(200)
          .end(function(err, res) {
            if(err){
              done(err)
            }
            knex('users').where('id', 1).first().then(function(data) {
              expect(res.text).to.contain(data.description)
              done();
            })
          })
 })
 describe('author', function () {
  it('should display all of the authors', function (done) {
    request.get('/authors')
           .expect(200)
           .end(function(err, res) {
             if(err){
               done(err)
             }
             expect(res.text).to.contain("Alex,Martelli")
             done();
           })
  })
 it('should display a single users posts', function (done) {
   request.get('/authors/1')
          .expect(200)
          .end(function(err, res) {
            if(err){
              done(err)
            }
            knex('books').where('books', 1).first().then(function(data) {
              expect(res.text).to.contain(data.auth1_ln)
              done();
            })
          })
 })
 
