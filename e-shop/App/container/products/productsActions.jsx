import { GET_PRODUCTS_SUCCESS, GET_PRODUCTS_ERROR } from './productsConstants.jsx';
import "isomorphic-fetch";

export function receiveProducts(data) {
    return {
        type: GET_PRODUCTS_SUCCESS,
        products: data
    }
}

export function errorReceive(err) {
    return {
        type: GET_PRODUCTS_ERROR,
        error: err
    }
}

const constants = {
    getProducts: 'https://localhost:7078/api/product/products'
}

export function getProducts() {
    return (dispatch) => {
        fetch(constants.getProducts)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log('fetch: ' + receiveProducts(data).products[0].title)
                dispatch(receiveProducts(data));
            })
            .catch((error) => {
                dispatch(errorReceive(error));
            })
    }
}