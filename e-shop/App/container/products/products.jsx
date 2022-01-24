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
        alert("Продукт добавлен в корзину.");
    });
}

class Products extends React.Component {
    constructor(props) {
        super(props);

        this.state = { loggedIn: false };

        this.addToCart = this.addToCart.bind(this);
        this.updateProduct = this.updateProduct.bind(this);
        this.addProduct = this.addProduct.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
        this.getImage = this.getImage.bind(this);
    }

    addToCart(id) {
        let queryTrailer = '?userName=' + localStorage.getItem('userName');
        queryTrailer += '&productId=' + id;

        fetchHttpPost(constants.addToCart + queryTrailer, { userName: localStorage.getItem('userName'), id });
    }

    updateProduct(id, title, image, description, price) {
        alert( id, title, image, description, price );

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
        });
    }

    addProduct(title, image, description, price) {
        let id = 0;

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
        });
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
            body: JSON.stringify({ productId: id })
        });
    }

    getImage(src) {
        let queryTrailer = '?path=' + src;

        fetch(constants.getImage + queryTrailer).then(response => response);
    }

    componentDidMount() {
        if (localStorage.getItem('token')) {
            this.setState({ loggedIn: true });
        }
        this.props.getProducts();
    }

    render() {
        let products = this.props.products.map(item => {
            return (
                <div key={item.productId} className='product'>
                    
                    {localStorage.getItem('isAdmin') ?
                        <div className='productForm'>
                            <form >
                                <input type="hidden" id={item.productId} defaultValue={item.productId}></input>
                                <input type="text" id={'title' + item.productId} name="title" className='title' defaultValue={item.title}></input>
                                <input type="text" id={'image' + item.productId} name="image" className='image' defaultValue={item.imageSrc}></input>
                                <img src={constants.getImage + '?path=' + item.imageSrc} height="200px" width="160px" />
                                <input type="text" id={'desc' + item.productId} name="desc" className='description' defaultValue={item.description}></input>
                                <input type="number" id={'price' + item.productId} name="price" className='price' defaultValue={item.price}></input>
                                <br/>
                                <button onClick={e => {
                                    let id = document.getElementById(item.productId).value;
                                    let title = document.getElementById('title' + item.productId).value;
                                    let image = document.getElementById('image' + item.productId).value;
                                    let desc = document.getElementById('desc' + item.productId).value;
                                    let price = document.getElementById('price' + item.productId).value;
                                    alert(id, title, image, desc, price);

                                    this.updateProduct(id, title, image, desc, price);
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
                            <img src={constants.getImage + '?path=' + item.imageSrc} height="200px" width="160px" />
                            <div className='description'>{item.description}</div>
                            <div className='price'>{item.price}</div>
                            {localStorage.getItem('token') ? <button onClick={e => this.addToCart(item.productId)}>Buy</button> : null}
                        </div>                       
                        }
                    
                </div>
                )
        })

        return (
            <div id="products">
                <div id='products'>{products}</div>
                {localStorage.getItem('isAdmin') ?
                    <form className="productForm">
                        <label htmlFor="title">Название: </label>
                        <input type="text" id="titleNew" name="title" className='title'></input>

                        <label htmlFor="image">Изображение: </label>
                        <input type="text" id="imageNew" name="image" className='image'></input>

                        <label htmlFor="desc">Описание: </label>
                        <input type="text" id="descNew" name="desc" className='description'></input>

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