import React from 'react';

function CartSummaryItem(props) {
  const cartItems = props.cart;
  const cart = [];
  let cartTotal = 0;
  cartItems.forEach(element => {
    cartTotal += element.price;
    const price = element.price.toString();
    const beforeDecimal = price.slice(0, price.length - 2);
    const afterDecimal = price.slice(price.length - 2);
    const total = `${beforeDecimal}.${afterDecimal}`;
    const productPrice = parseFloat(total).toFixed(2);
    cart.push(
      <div className="col-12 card my-3" key={element.cartItemId}>
        <div className="row no-gutters my-3">
          <div className="col-4">
            <img className="card-img image" src={element.image} alt="" />
          </div>
          <div className="col-8">
            <div className="card-body">
              <h5 className="card-title">{element.name}</h5>
              <p className="card-text">{`$${productPrice}`}</p>
              <p className="card-text">{element.shortDescription}</p>
            </div>
          </div>
        </div>
      </div>
    );
  });
  if (!cart[0]) {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <h1 className="orange mt-5">No items in cart.</h1>
        </div>
      </div>
    );
  } else {
    const totalPrice = cartTotal.toString();
    const beforeDecimal = totalPrice.slice(0, totalPrice.length - 2);
    const afterDecimal = totalPrice.slice(totalPrice.length - 2);
    const total = `${beforeDecimal}.${afterDecimal}`;
    const formattedTotalPrice = parseFloat(total).toFixed(2);
    return (
      <>
        <div className="container">
          <div className="row mt-5 justify-content-center">
            <div className="col-10 mt-2">
              <p onClick={() => props.handleClick('catalog', { params: {} })} className="orange pointer">{'< back to catalog'}</p>
            </div>
            <div className="col-10 my-2">
              <h1 className="orange">
                My Cart
              </h1>
            </div>
            <div className="col-10 justify-content-center">
              {cart}
            </div>
            <div className="col-10 my-3 d-flex justify-content-between align-items-center">
              <h2 className="orange">
                {`Total: $${formattedTotalPrice}`}
              </h2>
              <button onClick={() => props.handleClick('checkout', { params: {} })} type="button" className="btn orange border-orange">Checkout</button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default CartSummaryItem;
