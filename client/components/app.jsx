import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummaryItem from './cart-summary-item';
import CheckoutForm from './checkout-form';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {
        name: 'catalog',
        params: {}
      },
      cart: []
    };
    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
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

  placeOrder(order) {
    const init = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(order)
    };
    fetch('api/orders', init)
      .then(() => {
        this.setState({
          view: {
            name: 'catalog',
            params: {}
          },
          cart: []
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    if (this.state.view.name === 'catalog') {
      return (
        <>
          <Header handleClick={() => this.setView('cart', { params: {} })} cartItemCount={this.state.cart.length} />
          <ProductList setView={this.setView} />
        </>
      );
    } else if (this.state.view.name === 'details') {
      return (
        <>
          <Header handleClick={() => this.setView('cart', { params: {} })} cartItemCount={this.state.cart.length} />
          <ProductDetails productId={this.state.view.params.product}
            setView={this.setView}
            addToCart={this.addToCart}/>
        </>
      );
    } else if (this.state.view.name === 'cart') {
      return (
        <>
          <Header cartItemCount={this.state.cart.length} />
          <CartSummaryItem cart={this.state.cart} handleClick={this.setView}/>
        </>
      );
    } else {
      return (
        <>
          <Header handleClick={() => this.setView('cart', { params: {} })} cartItemCount={this.state.cart.length}/>
          <CheckoutForm placeOrder={this.placeOrder} cart={this.state.cart} handleClick={() => this.setView('catalog', { params: {} })}/>
        </>
      );
    }
  }
}
