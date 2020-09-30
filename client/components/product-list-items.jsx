import React from 'react';

function ProductListItem(props) {
  const price = props.product.price.toString();
  const beforeDecimal = price.slice(0, price.length - 2);
  const afterDecimal = price.slice(price.length - 2);
  const total = `${beforeDecimal}.${afterDecimal}`;
  const productPrice = parseFloat(total).toFixed(2);

  return (
    <div onClick={props.handleClick} className="col-4 mt-5 card-group" id={props.product.productId}>
      <div className="card pointer bg-shadow">
        <div className="image">
          <img src={props.product.image} className="card-img-top"/>
        </div>
        <div className="card-body">
          <h5 className="card-title">{props.product.name}</h5>
          <p className="card-text">${productPrice}</p>
          <p className="card-text">{props.product.shortDescription}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductListItem;
