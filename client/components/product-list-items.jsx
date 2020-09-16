import React from 'react';

function ProductListItem(props) {
  return (
    <div className="card" style="width: 18rem;">
      <img src={props.image} className="card-img-top"/>
      <div className="card-body">
        <h5 className="card-title">{props.productName}</h5>
        <p>{props.price}</p>
        <p className="card-text">{props.shortDescription}</p>
      </div>
    </div>
  );
}

export default ProductListItem;
