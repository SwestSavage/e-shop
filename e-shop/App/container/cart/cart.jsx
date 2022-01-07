import React from 'react';
import { connect } from 'react-redux';
import { getOrders } from './cartActions.jsx';

class Cart extends React.Component {

    componentDidMount() {
        this.props.getOrders();
    }

    render() {
        let orders = this.props.orders.map(item => {
            return (
                <tr key={item.id}>
                    <td>{item.productId}</td>
                    <td>{item.userId}</td>
                    <td>{item.date}</td>
                </tr>
                )
        });
        return (
            <div>
                <h3>Корзина</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Наименование</th>
                            <th>Цена</th>
                        </tr>
                    </thead>
                    <tbody>{orders}</tbody>
                        
                </table>
            </div>
            );
    }
};

let mapProps = (state) => {
    return {
        orders: state.data,
        error: state.error
    }
}

let mapDispatch = (dispatch) => {
    return {
        getOrders: () => dispatch(getOrders())
    }
}

export default connect(mapProps, mapDispatch)(Cart);
//let orders = this.props.order.map(item => {
        //    return (
        //        <tr>
        //            <td>{item.product.title}</td>
        //            <td>{item.product.price}</td>
        //        </tr>
        //        )
        //});