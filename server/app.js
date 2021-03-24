
const express = require('express');

const routes = require('./api/router')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/products', routes);

module.exports = app;
