import React from 'react';

function Header(props) {
  return (
    <header className="container mt-3 justify-content-center">
      <div className="row w-100">
        <div className="col-sm-12 col-md-6 d-flex px-0 align-items-end justify-center-sm mb-2">
          <h1 className="store-name mb-0">Wicked Sales</h1>
          <img className="logo ml-3" src="./images/cauldron-icon.png" alt="cauldron" />
        </div>
        <div onClick={props.handleClick} className="col cart d-flex align-items-center">
          <p className="mb-0">{props.cartItemCount} items</p>
          <i className="cart fa fa-shopping-cart ml-2"></i>
        </div>
      </div>
    </header>
  );
}

export default Header;
