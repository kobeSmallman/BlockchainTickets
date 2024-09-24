// blockchain-tickets-ui/src/components/Footer/index.js

import React from 'react';
import { NavLink } from 'react-router-dom';
import './styles.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__links">
        <NavLink to="/about">About Us</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/privacy">Privacy Policy</NavLink>
        <NavLink to="/terms">Terms of Service</NavLink>
      </div>
      <p>© {new Date().getFullYear()} BlockchainTickets. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
