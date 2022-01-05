import { GET_ORDERS_ERROR, GET_ORDERS_SUCCESS } from './cartConstants';

const initialState = {
    data: [],
    error: ''
}

export default function orders(state = initialState, action) {
    switch (action.type) {
        case GET_ORDERS_SUCCESS:
            return { ...state, data: action.orders, error: '' };
        case GET_ORDERS_ERROR:
            return { ...state, error: action.error };
        default:
            return state;
    }
}