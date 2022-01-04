import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './header/header.jsx';
import About from './about/about.jsx';
import Products from './products/products.jsx';
import Cart from './cart/cart.jsx';
import { getProducts } from './products/productsActions.jsx';
import SignupForm from './registration/registrationFrom.jsx';
import SignInForm from './signin/signin.jsx';
import "isomorphic-fetch";

fetch('https://localhost:7078/api/product/products')
    .then((response) => {
        return response.json()
    }).then((result) => {
        console.log('res: ' + result[0].title)
    })

export default class App extends React.Component {
    render() {
        return (
            <Router>
                <div>                   
                    <Header />
                    <main>
                        <Switch>
                            <Route path="/about">
                                <About />
                            </Route>
                            <Route path="/signup">
                                <SignupForm />
                            </Route>
                            <Route path="/signin">
                                <SignInForm />
                            </Route>
                            <Route path="/">
                                <Products className="products-container"/>
                            </Route>
                            <Route path="/cart">
                                <Cart />
                            </Route>
                        </Switch>
                    </main>
                </div>
            </Router>
        );
    }
};