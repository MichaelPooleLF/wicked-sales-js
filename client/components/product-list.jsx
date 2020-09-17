import React from 'react';
import ProductListItems from './product-list-items';

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    const productId = parseInt(event.currentTarget.getAttribute('id'), 10);
    this.props.setView('details', { product: productId });
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
          product = {element}
          handleClick={this.handleClick}/>
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
