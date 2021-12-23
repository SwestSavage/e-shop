import { GET_PRODUCTS_SUCCESS, GET_PRODUCTS_ERROR } from './productsConstants.jsx';

const initialState = {
    data: [],
    error: ''
}

export default function products(state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCTS_SUCCESS:
            return { ...state, data: action.products, error: '' };

        case GET_PRODUCTS_ERROR:
            return { ...state, error: action.error };

        default:
            return state;
    }
}