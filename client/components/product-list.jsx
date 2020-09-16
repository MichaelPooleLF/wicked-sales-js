import React from 'react';
import ProductListItems from './product-list-items';

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
    const listItems = this.state.products.map(element => {
      return (
        <ProductListItems key={element.productId}
          image={element.image}
          name={element.name}
          price={element.price}
          shortDescription={element.shortDescription} />
      );
    });

    return (
      <div className="container">
        <div className="row">
          {listItems}
        </div>
      </div>
    );
  }
}

export default ProductList;
