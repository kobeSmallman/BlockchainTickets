import React from "react";
import { NavLink } from "react-router-dom";
import "./styles.css";

const Header = () => {
  return (
    <header className="header">
      <nav className="nav">
        <NavLink to="/" exact activeClassName="active">
          Home
        </NavLink>
        <NavLink to="/event" activeClassName="active">
          Events
        </NavLink>
        <NavLink to="/login" activeClassName="active">
          Login/Register
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
