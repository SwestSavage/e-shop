import React from 'react';
import { connect } from 'react-redux'
import { getProducts } from './productsActions.jsx';

class Products extends React.Component {

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
                <div key={item.id} className='product'>
                    <div className='title'>{item.title}</div>
                    <div className='image'>{item.image}</div>
                    <div className='description'>{item.description}</div>
                    <div className='price'>{item.price}</div>
                    <button>Buy</button>
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