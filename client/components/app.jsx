import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';

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

  // componentDidMount() {
  //   fetch('/api/health-check')
  //     .then(res => res.json())
  //     .then(data => this.setState({ message: data.message || data.error }))
  //     .catch(err => this.setState({ message: err.message }))
  //     .finally(() => this.setState({ isLoading: false }));
  // }

  render() {
    if (this.state.view.name === 'catalog') {
      return (
        <>
          <Header />
          <ProductList setView={this.setView} />
        </>
      );
    } else {
      return (
        <>
          <Header />
          <ProductDetails productId={this.state.view.params.product}
            setView={this.setView} />
        </>
      );
    }
  }
}
