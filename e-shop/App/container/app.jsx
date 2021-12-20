import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './header/header.jsx';
import About from './about/about.jsx';
import Products from './products/products.jsx';

export default class App extends React.Component {
    render() {
        return (
            <Router>
                <div>                   
                    <Header />
                    <main>
                        <Switch>
                            <Route path="/about" component={About} />
                            <Route path="/" component={Products} />
                        </Switch>
                    </main>
                </div>
            </Router>
        );
    }
};