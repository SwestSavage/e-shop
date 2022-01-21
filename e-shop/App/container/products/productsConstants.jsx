export const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS';
export const GET_PRODUCTS_ERROR = 'GET_PRODUCTS_ERROR';

export const ADD_TO_CART_SUCCESS = 'ADD_TO_CART_SUCCESS';

export const constants = {
    getProducts: 'https://localhost:7078/api/product/products',
    addToCart: 'https://localhost:7078/api/order/add',
    updateProduct: 'https://localhost:7078/api/product/update',
    addProduct: 'https://localhost:7078/api/product/add',
    deleteProduct: 'https://localhost:7078/api/product/delete',
    getImage: 'https://localhost:7078/api/product/image'
}