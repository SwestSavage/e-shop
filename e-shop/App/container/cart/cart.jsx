import React from 'react';
import { connect } from 'react-redux';
import { getOrders } from './cartActions.jsx';
import { constants } from './cartConstants.jsx';

function getOrdersTest() {
    fetch(constants.getOrders + '?userName=' + localStorage.getItem('userName'))
        .then((response) => {
            return response.json();
        }).then((data) => {
            console.log('fetch ' + data.user.login);
            return data;
        })
}


export default class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: [], isLoading: true };

        this.deleteOrder = this.deleteOrder.bind(this);
    }

    componentDidMount() {
        fetch(constants.getOrders + '?userName=' + localStorage.getItem('userName'))
            .then(response => response.json())
            .then((json) => {
                //console.log('fetch ' + data.user.login);
                this.setState({ data: json, isLoading: false });
            });
        //this.props.getOrders();
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
        }).then(response => response.json());// 
    }

    render() {
        console.log('Cart Props: ' + this.state.data);
        for (let i in this.state.data) {
            console.log(i);
        }
        console.log(this.state.data.products);

        //let orders = this.props.orders.map(item => {
        //    console.log('test: ' + item.products[0].title);
        //    return (
        //        <tr key={item.id}>
        //            <td>{item.productId}</td>
        //            <td>{item.title}</td>
        //            <td>{item.date}</td>
        //        </tr>
        //        )
        //});
        
       
        if (this.state.isLoading) {
            return (
                <div>Loading...</div>
                )
        }

        let order = this.state.data;
        

        let products = order.productsWithOrderId.map(item => {
            return (
                <tr key={item.orderId}>
                    <td>{item.product.title}</td>
                    <td>{item.product.price}</td>
                    <td>{item.orderId}</td>
                    <td><button onClick={e => {
                        this.deleteOrder(item.orderId);
                    }}>Delete</button></td>
                </tr>
            )
        });

        return (
            <div>
                <h3>Корзина пользователя {this.state.data.user.login}</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Наименование</th>
                            <th>Цена</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products}
                    </tbody>
                        
                </table>
            </div>
            );
    }
};

//let mapProps = (state) => {
//    return {
//        orders: state.ordersData,
//        error: state.error
//    }
//}

//let mapDispatch = (dispatch) => {
//    return {
//        getOrders: () => dispatch(getOrders())
//    }
//}

//export default connect(mapProps, mapDispatch)(Cart);
//let orders = this.props.order.map(item => {
        //    return (
        //        <tr>
        //            <td>{item.product.title}</td>
        //            <td>{item.product.price}</td>
        //        </tr>
        //        )
        //});