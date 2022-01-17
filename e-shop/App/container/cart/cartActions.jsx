import { GET_ORDERS_SUCCESS, GET_ORDERS_ERROR, constants } from './cartConstants.jsx';
import "isomorphic-fetch";

export function receiveOrders(data) {
    return {
        type: GET_ORDERS_SUCCESS,
        orders: data
    }
}

export function errorReceive(err) {
    return {
        type: GET_ORDERS_ERROR,
        error: err
    }
}

export function getOrders() {
    return (dispatch) => {
        fetch(constants.getOrders + '?userName=' + localStorage.getItem('userName'))
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log('fetch ' + data.user.login + ' ' + data.products[0].title);
                dispatch(receiveOrders(data));
            })
            .catch((error) => {
                dispatch(errorReceive(error));
            })
    }
}