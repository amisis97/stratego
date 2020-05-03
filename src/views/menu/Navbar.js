import React from 'react';
import './Navbar.css';
import logo from '../../assets/images/logopng.png';
import { NavLink } from 'react-router-dom';

export function Navbar() {
    return (
        <div className="menu">
            <NavLink exact to="/"><img alt="logo" src={logo} /></NavLink>
            <NavLink className="desc" to="/leiras">Leírás</NavLink>
        </div>
    );
}