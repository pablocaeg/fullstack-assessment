import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header>
      <h1>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          Phone Management Application
        </Link>
      </h1>
    </header>
  );
};

export default Header;
