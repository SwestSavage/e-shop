import React from 'react';

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
                </menu>
            </header>
        );
    }
};