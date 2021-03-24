import {ERRORS, getPageUrl, getProductUrl, SERVER_ADDRESS} from "../utils/utils";
import {ToastAndroid} from 'react-native';

export const ActionTypes = {
    'FETCH_CATALOG_SUCCESS' : 'FETCH_CATALOG_SUCCESS',
    'FETCH_CATALOG_LOADING' : 'FETCH_CATALOG_LOADING',
    'FETCH_CATALOG_FAILED' : 'FETCH_CATALOG_FAILED',

    'PRODUCT_SEARCH' : 'PRODUCT_SEARCH',

    'FETCH_PRODUCT_SUCCESS' : 'FETCH_PRODUCT_SUCCESS',
    'FETCH_PRODUCT_LOADING' : 'FETCH_PRODUCT_LOADING',
    'FETCH_PRODUCT_FAILED' : 'FETCH_PRODUCT_FAILED',
};


const fetchData = (dispatch, url, actionSuccess, actionLoading, actionFailed) => {
    dispatch(fetchDataLoading(actionLoading));
    return fetch(url)
        .then(res => {
            if(res.status === 404)
                throw new Error(ERRORS.NOT_FOUND);
            return res.json()
        })
        .then(data => {
            if(Object.keys(data).length === 0)
                throw new Error(ERRORS.PRODUCTS_FULL);
            dispatch(fetchDataSuccess(actionSuccess, data))
        })
        .catch(error => {
            ToastAndroid.show(error.message, ToastAndroid.LONG);
            dispatch(fetchDataFailed(actionFailed));
        });

}


const fetchDataSuccess = (type, data) => ({
    type: type,
    data: data
});

const fetchDataLoading = (type) => ({
    type : type,
});

const fetchDataFailed = (type) => ({
    type: type,
    isLoading: false
});

const search = (text) => ({
    type: ActionTypes.PRODUCT_SEARCH,
    text: text
});



export const fetchProducts = (page, dispatch) =>
    fetchData(dispatch, getPageUrl(page),
        ActionTypes.FETCH_CATALOG_SUCCESS,
        ActionTypes.FETCH_CATALOG_LOADING,
        ActionTypes.FETCH_CATALOG_FAILED);

export const fetchProductDetails = (productId, dispatch) =>
    fetchData(dispatch, getProductUrl(productId),
        ActionTypes.FETCH_PRODUCT_SUCCESS,
        ActionTypes.FETCH_PRODUCT_LOADING,
        ActionTypes.FETCH_PRODUCT_FAILED);


export const searchProduct = (text, dispatch) =>
    dispatch(search(text));
