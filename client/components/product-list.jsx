import React from 'react';
// import ProductListItems from './product-list-items';

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts() {
    fetch('/api/products')
      .then(result => result.json())
      .then(data => this.setState({
        products: data
      }));
  }

  render() {
    return (
      <>
      </>
    );
  }
}

export default ProductList;
