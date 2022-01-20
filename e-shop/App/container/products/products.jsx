import React from 'react';
import { connect } from 'react-redux'
import { getProducts } from './productsActions.jsx';
import { constants } from './productsConstants.jsx';

let fetchHttpPost = (url, data) => {
    fetch(url, {
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
        body: JSON.stringify(data)
    }).then(response => {
        alert(response);
    });
}

class Products extends React.Component {
    constructor(props) {
        super(props);

        this.addToCart = this.addToCart.bind(this);
        this.updateProduct = this.updateProduct.bind(this);
        this.addProduct = this.addProduct.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
    }

    addToCart(id) {
        let queryTrailer = '?userName=' + localStorage.getItem('userName');
        queryTrailer += '&productId=' + id;

        fetchHttpPost(constants.addToCart + queryTrailer, { userName: localStorage.getItem('userName'), id });
        //fetch(constants.addToCart + queryTrailer, {
        //    method: 'POST',
        //    mode: 'cors',
        //    cache: 'no-cache',
        //    credentials: 'same-origin',
        //    headers: {
        //        'Content-type': 'application/x-www-form-urlencoded',
        //        'Authorization': 'Bearer ' + localStorage.getItem('token')
        //    },
        //    redirect: 'follow',
        //    referrerPolicy: 'no-referrer', // no-referrer, *client
        //    body: JSON.stringify({ userName: localStorage.getItem('userName'), id })
        //}).then(response => {
        //    alert(response);
        //});
    }

    updateProduct(id, title, image, description, price) {
        alert(JSON.stringify({ id, title, image, description, price }));

        //fetchHttpPost(constants.updateProduct, { productId: id, title, image, description, price });
        fetch(constants.updateProduct, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer', // no-referrer, *client
            body: JSON.stringify({ productId: id, title, image, description, price })
        }).then(response => {
            //alert(response.text());
        })
    }

    addProduct(title, image, description, price) {
        let id = 0;

        //fetchHttpPost(constants.addProduct, { productId: id, title, image, description, price });
        fetch(constants.addProduct, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer', // no-referrer, *client
            body: JSON.stringify({ productId: id, title, image, description, price })
        }).then(response => {
            //alert(response.text());
        })
    }

    deleteProduct(id) {
        fetch(constants.deleteProduct + '?productId=' + id, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer', // no-referrer, *client
            body: JSON.stringify({ productId: id})
        }).then(response => {
            //alert(response.text());
        })
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
                    
                    {localStorage.getItem('isAdmin') ?
                        <div>
                            <form >
                                <input type="hidden" id={item.productId} defaultValue={item.productId}></input>
                                <input type="text" id={item.title} name="title" className='title' defaultValue={item.title}></input>
                                <input type="text" id={item.image} name="image" className='image' defaultValue={item.image}></input>
                                <input type="text" id={item.description} name="desc" className='description' defaultValue={item.description}></input>
                                <input type="number" id={item.price} name="price" className='price' defaultValue={item.price}></input>
                                <br/>
                                <button onClick={e => {
                                    let id = document.getElementById(item.productId);
                                    let title = document.getElementById(item.title);
                                    let image = document.getElementById(item.image);
                                    let desc = document.getElementById(item.description);
                                    let price = document.getElementById(item.price);

                                    this.updateProduct(id.value, title.value, image.value, desc.value, price.value);
                                    //alert(title.value + image.value + desc.value + price.value);
                                }}>Change</button>
                                <button onClick={e => {
                                    let id = document.getElementById(item.productId).value;

                                    this.deleteProduct(id);
                                }}>Delete</button>
                            </form>                          
                        </div>
                        :
                        <div>
                            <div className='title'>{item.title}</div>
                            <div className='image'>{item.image}</div>
                            <div className='description'>{item.description}</div>
                            <div className='price'>{item.price}</div>
                            <button onClick={e => this.addToCart(item.productId)}>Buy</button>
                        </div>                       
                        }
                    
                </div>
                )
        })

        return (
            <div id="products">
                <div id='products'>{products}</div>
                {localStorage.getItem('isAdmin') ?
                    <form className="product">
                        <label htmlFor="title">Название: </label>
                        <input type="text" id="titleNew" name="title" className='title'></input>

                        <label htmlFor="image">Изображение: </label>
                        <input type="text" id="imageNew" name="image" className='image'></input>

                        <label htmlFor="desc">Описание: </label>
                        <input type="text" id="descNew" name="desc" className='description'></input>

                        <br/>
                        <label htmlFor="price">Цена: </label>
                        <input type="number" id="priceNew" name="price" className='price'></input>

                        <br />
                        <button onClick={e => {
                            let title = document.getElementById("titleNew").value;
                            let image = document.getElementById("imageNew").value;
                            let desc = document.getElementById("descNew").value;
                            let price = document.getElementById("priceNew").value;

                            this.addProduct(title, image, desc, price);
                        }}>Add new</button>
                    </form>
                    : null}
            </div>
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