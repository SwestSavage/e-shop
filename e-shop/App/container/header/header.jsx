import React from 'react';
import { Link } from 'react-router-dom';

export default class Header extends React.Component {
    render() {
        return (
            <header>
                <menu>
                    <ul>
                        <li>
                            <Link to="/">Продукты</Link>
                        </li>
                        <li>
                            <Link to="/about">Обо мне</Link>
                        </li>
                        
                    </ul>
                    {localStorage.getItem('token') ?
                        <ul>
                            <li>
                                <Link to="/cart">Корзина</Link>
                            </li>
                            <li>
                                <Link to="/" onClick={() => localStorage.removeItem('token')}>Выйти</Link>
                            </li>
                        </ul>
                        :
                        <ul>
                            <li>
                                <Link to="/signup">Регистрация</Link>
                            </li>
                            <li>
                                <Link to="/signin">Вход</Link>
                            </li>
                        </ul> }
                </menu>
            </header>
        );
    }
};