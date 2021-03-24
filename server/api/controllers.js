const productsFunctions = require("../services/products");

const controllers = {
    getProductById: (req, res) => {
        const productId = req.params.productId;
        res.send(productsFunctions.getProductById(productId));
    },
    getProducts: (req, res) => {
        const page = parseInt(req.query.page) || 1;
        res.send(productsFunctions.getProducts(page));
    },
};

module.exports = controllers;
