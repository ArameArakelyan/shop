import React from "react";
import { Link } from "react-router-dom";

function Header() {
    return (
        <header className="header">
            <div className="logo">
                <h2 className="logotext">FakeStore</h2>
            </div>
            <nav>
                <ul className="menu">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/shop">Shop</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header