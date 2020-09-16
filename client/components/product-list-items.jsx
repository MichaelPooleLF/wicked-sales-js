import React from 'react';

function ProductListItem(props) {
  const price = props.price.toString();
  const beforeDecimal = price.slice(0, price.length - 2);
  const afterDecimal = price.slice(price.length - 2);
  const total = `${beforeDecimal}.${afterDecimal}`;
  const productPrice = parseFloat(total);

  return (
    <div className="col-4 mt-5 card-group">
      <div className="card">
        <div className="image">
          <img src={props.image} className="card-img-top"/>
        </div>
        <div className="card-body">
          <h5 className="card-title">{props.name}</h5>
          <p className="card-text">${productPrice.toFixed(2)}</p>
          <p className="card-text">{props.shortDescription}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductListItem;
