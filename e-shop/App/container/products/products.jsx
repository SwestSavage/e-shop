import React from 'react';
import { connect } from 'react-redux'
import { getProducts } from './productsActions.jsx';
import { constants } from './productsConstants.jsx';

class Products extends React.Component {

    addToCart(id) {
        let queryTrailer = '?userName=' + localStorage.getItem('userName');
        queryTrailer += '&productId=' + id;

        fetch(constants.addToCart + queryTrailer, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer', // no-referrer, *client
            body: JSON.stringify({ userName: localStorage.getItem('userName'), id })
        }).then(response => {
            alert(response);
        });
    }

    componentDidMount() {
        this.props.getProducts();
    }

    render() {
        console.log('props:');
        for (let key in this.props.products) {
            console.log('key: ' + key + ', value: ' + this.props.products[key]);
        }
        let products = this.props.products.map(item => {
            return (
                <div key={item.productId} className='product'>
                    <div className='title'>{item.title}</div>
                    <div className='image'>{item.image}</div>
                    <div className='description'>{item.description}</div>
                    <div className='price'>{item.price}</div>
                    <button onClick={e => this.addToCart(item.productId)}>Buy</button>
                </div>
                )
        })

        return (
            <div id='products'>{products}</div>
        );
    }
};

let mapProps = (state) => {
    return {
        products: state.data,
        error: state.error
    }
}

let mapDispatch = (dispatch) => {
    return {
        getProducts: () => dispatch(getProducts())
    }
}

export default connect(mapProps, mapDispatch)(Products);