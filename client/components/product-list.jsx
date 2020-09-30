import React from 'react';
import ProductListItems from './product-list-items';

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'modal',
      visited: false,
      products: []
    };
    this.handleClick = this.handleClick.bind(this);
    this.showProducts = this.showProducts.bind(this);
  }

  handleClick(event) {
    const productId = parseInt(event.currentTarget.getAttribute('id'), 10);
    this.props.setView('details', { product: productId });
  }

  showProducts(event) {
    // const body = event.target.closest('body');
    // body.classList.remove('overflow-hidden');
    localStorage.setItem('visited', true);
    this.setState({
      visited: true
    });
  }

  componentDidMount() {
    this.getProducts();
    const visited = localStorage.getItem('visited');
    this.setState({
      visited
    });
  }

  getProducts() {
    fetch('/api/products')
      .then(result => result.json())
      .then(data => this.setState({
        products: data
      }))
      .catch(err => console.error(err));
  }

  render() {
    const listItems = this.state.products.map(element => {
      return (
        <ProductListItems key={element.productId}
          product = {element}
          handleClick={this.handleClick}/>
      );
    });

    if (!this.state.visited) {
      return (
        <>
          <div className="notice d-flex justify-content-center align-items-center">
            <div className="notice-content container">
              <div className="row justify-content-center align-items-center">
                <div className="col-8 d-flex flex-wrap justify-content-center">
                  <h1 className="text-center">Please Note:</h1>
                  <h1 className="text-center">This site is a demo.</h1>
                  <h1 className="text-center">No real purchases will be made.</h1>
                  <button onClick={this.showProducts} type="button" className="btn border-orange orange mt-3">Got It!</button>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              {listItems}
            </div>
          </div>
        </>
      );
    } else if (this.state.visited) {
      return (
        <div className="container">
          <div className="row">
            {listItems}
          </div>
        </div>
      );
    }

  }
}

export default ProductList;
