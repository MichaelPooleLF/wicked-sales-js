import React from 'react';

function CartSummaryItem(props) {
  // console.log(props.image);
  return (
    <div className="col-12">
      <img src={'/images/shake-weight.jpg'} alt=""/>
      <div className="image">{props.image}</div>
    </div>
  );
}

export default CartSummaryItem;
