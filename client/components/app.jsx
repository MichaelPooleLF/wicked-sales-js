import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummaryItem from './cart-summary-item';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {
        name: 'cart-summary',
        params: {}
      },
      cart: []
    };
    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  getCartItems() {
    fetch('/api/cart')
      .then(res => res.json())
      .then(data => this.setState({ cart: data }))
      .catch(err => console.error(err));
  }

  setView(name, params) {
    this.setState({
      view: { name, params }
    });
  }

  componentDidMount() {
    this.getCartItems();
  }

  addToCart(product) {
    const newArray = this.state.cart.map(element => ({ ...element }));
    const init = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    };
    fetch('api/cart', init)
      .then(result => result.json())
      .then(data => {
        newArray.push(data);
        return newArray;
      })
      .then(array => this.setState({ cart: array }))
      .catch(err => console.error(err));
  }

  render() {
    if (this.state.view.name === 'catalog') {
      return (
        <>
          <Header cartItemCount={this.state.cart.length} />
          <ProductList setView={this.setView} />
        </>
      );
    } else if (this.state.view.name === 'details') {
      return (
        <>
          <Header cartItemCount={this.state.cart.length} />
          <ProductDetails productId={this.state.view.params.product}
            setView={this.setView}
            addToCart={this.addToCart}/>
        </>
      );
    } else {
      return (
        <>
          <Header cartItemCount={this.state.cart.length} />
          <div className="container">
            <div className="row">
              <CartSummaryItem />
            </div>
          </div>
        </>
      );
    }
  }
}
