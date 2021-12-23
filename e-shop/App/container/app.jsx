import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './header/header.jsx';
import About from './about/about.jsx';
import Products from './products/products.jsx';
import { getProducts } from './products/productsActions.jsx';
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
                            <Route path="/">
                                <Products className="products-container"/>
                            </Route>
                        </Switch>
                    </main>
                </div>
            </Router>
        );
    }
};