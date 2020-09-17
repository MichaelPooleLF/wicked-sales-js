import React from 'react';

function Header(props) {
  return (
    <header className="container mt-3">
      <div className="d-flex">
        <h1 className="store-name ml-3 mb-0">Wicked Sales</h1>
        <img className="logo ml-3" src="./images/cauldron-icon.png" alt="cauldron" />
      </div>
      <div className="cart d-flex align-items-center">
        <p className="mb-0">{props.cartItemCount}</p>
        <i className="cart fa fa-shopping-cart ml-2"></i>
      </div>
    </header>
  );
}

export default Header;
