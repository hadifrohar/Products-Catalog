export const COLORS = {

    LIGHT: '#ffffff',
    DARK: '#24292e'

};


export const ERRORS = {
    NOT_FOUND : 'Product couldn\'t be found!',
    PRODUCTS_FULL : 'There is no more products!'
}


export const SERVER_ADDRESS = "http://10.0.2.2:3000/products";

export const getPageUrl = (page) => SERVER_ADDRESS + '?page=' + page;
export const getProductUrl = (productId) => SERVER_ADDRESS+'/'+productId;
