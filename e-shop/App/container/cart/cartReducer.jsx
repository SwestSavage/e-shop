import { GET_ORDERS_ERROR, GET_ORDERS_SUCCESS } from './cartConstants.jsx';

const initialOrderState = {
    ordersData: [],
    error: 'test'
}

export default function orders(state = initialOrderState, action) {
    switch (action.type) {
        case GET_ORDERS_SUCCESS:
            return { ...state, ordersData: action.orders, error: 'no error' };
        case GET_ORDERS_ERROR:
            return { ...state, error: action.error };
        default:
            return state;
    }
}