import React, {useContext} from 'react'
import {NavLink, useHistory} from 'react-router-dom'
import {AuthContext} from "../context/AuthContext";

export const Navbar = () => {
    const auth = useContext(AuthContext)
    const history = useHistory()

    const handleLogout = e => {
        e.preventDefault()
        auth.logout()
        history.push('/')
    }

    return (
        <nav>
            <div className="nav-wrapper blue darken-1" style={{padding: '0 2rem'}}>
                <a href="/" className="brand-logo">Сокращение ссылок</a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li>
                        <NavLink to={"/crate"}>Создать</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/links'}>Ссылки</NavLink>
                    </li>
                    <li><a href="/" onClick={handleLogout}>Выйти</a></li>
                </ul>
            </div>
        </nav>)
}