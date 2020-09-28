import React from 'react';

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      creditCard: '',
      shippingAddress: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const property = event.target.name;
    const value = event.target.value;
    this.setState({
      [property]: value
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row mt-5">
          <div className="col-10 offset-1">
            <h1 className="orange">Checkout</h1>
            <h4 className="orange mt-3">Order Total: $0.00</h4>
          </div>
          <form className="col-10 offset-1 mt-5">
            <div className="form-group mt-3">
              <label htmlFor="name" className="orange"><h4 className="mb-0">Name</h4></label>
              <input type="text" className="form-control" id="name" name="name" onChange={this.handleChange}/>
            </div>
            <div className="form-group mt-3">
              <label htmlFor="creditCard" className="orange"><h4 className="mb-0">Credit Card</h4></label>
              <input type="number" className="form-control" id="creditCard" name="creditCard" onChange={this.handleChange}/>
            </div>
            <div className="form-group mt-3">
              <label htmlFor="shippingAddress" className="orange"><h4 className="mb-0">Shipping Address</h4></label>
              <textarea className="form-control" name="shippingAddress" id="shippingAddress" rows="5" onChange={this.handleChange}></textarea>
            </div>
            <div className="form-group d-flex justify-content-between align-items-center mt-5">
              <p className="pointer orange">{'< Continue Shopping'}</p>
              <button type="submit" className="btn orange border-orange">Place Order</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default CheckoutForm;
