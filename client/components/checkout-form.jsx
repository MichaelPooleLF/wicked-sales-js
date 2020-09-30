import React from 'react';

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'checkout',
      name: '',
      creditCard: '',
      shippingAddress: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showCheckout = this.showCheckout.bind(this);
  }

  calcTotal() {
    const cart = this.props.cart;
    let cartTotal = 0;
    cart.forEach(element => {
      cartTotal += element.price;
    });
    const totalPrice = cartTotal.toString();
    const beforeDecimal = totalPrice.slice(0, totalPrice.length - 2);
    const afterDecimal = totalPrice.slice(totalPrice.length - 2);
    const total = `${beforeDecimal}.${afterDecimal}`;
    const formattedTotalPrice = parseFloat(total).toFixed(2);
    return formattedTotalPrice;
  }

  handleChange(event) {
    const property = event.target.name;
    const value = event.target.value;
    this.setState({
      [property]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.name && this.state.creditCard && this.state.shippingAddress) {
      this.props.placeOrder(this.state);
    } else {
      this.setState({
        view: 'modal'
      });
    }
  }

  showCheckout() {
    const { name, creditCard, shippingAddress } = this.state;
    this.setState({
      view: 'checkout',
      name,
      creditCard,
      shippingAddress
    });
  }

  render() {
    if (this.state.view === 'checkout') {
      return (
        <div className="container">
          <div className="row mt-5">
            <div className="col-10 offset-1">
              <h1 className="orange">Checkout</h1>
              <h4 className="orange mt-3">{`Order Total: $${this.calcTotal()}`}</h4>
            </div>
            <div className="col-10 offset-1 mt-3">
              <h5 className="white text-center"><em>Reminder: Don&apos;t put personal information on this site!</em></h5>
            </div>
            <form className="col-10 offset-1 mt-3" onSubmit={this.handleSubmit}>
              <div className="form-group mt-3">
                <label htmlFor="name" className="orange"><h4 className="mb-0">Name</h4></label>
                <input type="text" className="form-control" id="name" name="name" onChange={this.handleChange} value={this.state.name}/>
              </div>
              <div className="form-group mt-3">
                <label htmlFor="creditCard" className="orange"><h4 className="mb-0">Credit Card</h4></label>
                <input type="number" className="form-control" id="creditCard" name="creditCard" onChange={this.handleChange} value={this.state.creditCard}/>
              </div>
              <div className="form-group mt-3">
                <label htmlFor="shippingAddress" className="orange"><h4 className="mb-0">Shipping Address</h4></label>
                <textarea className="form-control" name="shippingAddress" id="shippingAddress" rows="5" onChange={this.handleChange} value={this.state.shippingAddress}></textarea>
              </div>
              <div className="form-group d-flex justify-content-between align-items-center mt-5">
                <p onClick={this.props.handleClick} className="pointer orange">{'< Continue Shopping'}</p>
                <button type="submit" className="btn orange border-orange">Place Order</button>
              </div>
            </form>
          </div>
        </div>
      );
    } else {
      return (
        <>
          <div className="notice d-flex justify-content-center align-items-center">
            <div className="notice-content container">
              <div className="row justify-content-center align-items-center">
                <div className="col-8 d-flex flex-wrap justify-content-center">
                  <h1 className="text-center">Whoops!</h1>
                  <h1 className="text-center">It looks like you forgot to fill out all the fields!</h1>
                  <h1 className="text-center">Please fill out all the fields before placing your order.</h1>
                  <button onClick={this.showCheckout} type="button" className="btn border-orange orange mt-3">Got It!</button>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row mt-5">
              <div className="col-10 offset-1">
                <h1 className="orange">Checkout</h1>
                <h4 className="orange mt-3">{`Order Total: $${this.calcTotal()}`}</h4>
              </div>
              <div className="col-10 offset-1 mt-3">
                <h5 className="white text-center"><em>Reminder: Don&apos;t put personal information on this site!</em></h5>
              </div>
              <form className="col-10 offset-1 mt-3" onSubmit={this.handleSubmit}>
                <div className="form-group mt-3">
                  <label htmlFor="name" className="orange"><h4 className="mb-0">Name</h4></label>
                  <input type="text" className="form-control" id="name" name="name" onChange={this.handleChange} />
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="creditCard" className="orange"><h4 className="mb-0">Credit Card</h4></label>
                  <input type="number" className="form-control" id="creditCard" name="creditCard" onChange={this.handleChange} />
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="shippingAddress" className="orange"><h4 className="mb-0">Shipping Address</h4></label>
                  <textarea className="form-control" name="shippingAddress" id="shippingAddress" rows="5" onChange={this.handleChange}></textarea>
                </div>
                <div className="form-group d-flex justify-content-between align-items-center mt-5">
                  <p onClick={this.props.handleClick} className="pointer orange">{'< Continue Shopping'}</p>
                  <button type="submit" className="btn orange border-orange">Place Order</button>
                </div>
              </form>
            </div>
          </div>
        </>
      );
    }
  }
}

export default CheckoutForm;
