const products = require("../assets/data.json").products;

const productsFunctions = {
    getProducts: (page => {
        return products.slice(10*(page-1), 10*page).map(({description, ...product}) => product);
    }),
    getProductById: (id) => {
        return products.find(product => product.id === id);
    }
};

module.exports = productsFunctions;
