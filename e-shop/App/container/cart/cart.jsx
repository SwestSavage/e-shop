import React from 'react';
import { constants } from './cartConstants.jsx';

export default class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: [], isLoading: true };

        this.deleteOrder = this.deleteOrder.bind(this);
        this.confirmOrder = this.confirmOrder.bind(this);
        this.fetchOrders = this.fetchOrders.bind(this);
    }

    fetchOrders() {
        fetch(constants.getOrders + '?userName=' + localStorage.getItem('userName'))
            .then(response => response.json())
            .then((json) => {
                this.setState({ data: json, isLoading: false });
            });
    }

    componentDidMount() {
        this.fetchOrders();
    }

    componentDidUpdate() {
        if (this.state.isLoading) {
            this.fetchOrders();
            this.setState({ data: this.state.data, isLoading: false });
        }       
    }

    deleteOrder(data = {}) {
        let url = constants.deleteOrder;
        
        fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *client
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        }).then(e => {
            this.setState({ data: this.state.data, isLoading: true });
        });//
        
    }

    confirmOrder(orderIds) {
        fetch(constants.confirmOrder, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *client
            body: JSON.stringify(orderIds) // body data type must match "Content-Type" header
        });//
        window.location.reload();
    }

    render() {
       
        if (this.state.isLoading) {
            return (
                <div>Loading...</div>
                )
        }

        let order = this.state.data;
        let sumPrice = 0;

        let orderIds = order.productsWithOrderId.map(item => item.orderId);
        let isConfirmed = false;

        let products = order.productsWithOrderId.map(item => {                       
            isConfirmed = item.order.isConfirmed;

            if (!item.order.isConfirmed) {
                sumPrice += item.product.price;
            }

            return (
                <tr key={item.orderId}>
                    <td>{item.product.title}</td>
                    <td>{item.product.description}</td>
                    <td>{item.product.price}</td>
                    <td>{item.order.isConfirmed}</td>
                    <td>{isConfirmed ? <div>Заказ подтвержден!</div> : <button onClick={e => {                       
                        this.deleteOrder(item.orderId);
                    }}>Delete</button>}</td>
                </tr>
            )
        });

        return (
            <div className="cart">
                <h3 className="child">Корзина пользователя {this.state.data.user.login}</h3>
                <table className="child">
                    <thead>
                        <tr>
                            <th>Наименование</th>
                            <th>Описание</th>
                            <th>Цена</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products}
                    </tbody>                   
                </table>
                <div className="child">
                    Итого: {sumPrice}
                    {isConfirmed ? null : <button onClick={e => this.confirmOrder(orderIds)}>Оформить заказ</button>}
                </div>
            </div>
            );
    }
};
