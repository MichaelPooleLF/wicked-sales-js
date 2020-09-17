import React from 'react';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.setView('catalog', { params: {} });
  }

  componentDidMount() {
    const productId = this.props.productId;
    // const productId = 1;
    fetch(`/api/products/${productId}`)
      .then(result => result.json())
      .then(data => {
        this.setState({
          product: data
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    if (this.state.product) {
      const price = this.state.product.price.toString();
      const beforeDecimal = price.slice(0, price.length - 2);
      const afterDecimal = price.slice(price.length - 2);
      const total = `${beforeDecimal}.${afterDecimal}`;
      const productPrice = parseFloat(total).toFixed(2);

      return (
        <>
          <div className="container bg-light px-4 mt-5">
            <div className="row mb-3">
              <p onClick={this.handleClick} className="text-secondary back">{'< back to catalog'}</p>
              <div className="col-4 details mt-5">
                <img src={this.state.product.image}/>
              </div>
              <div className="col-8 mt-5">
                <h1>{this.state.product.name}</h1>
                <h3>${productPrice}</h3>
                <p>{this.state.product.shortDescription}</p>
              </div>
            </div>
            <div className="row">
              <div className="col mb-3">
                <p>{this.state.product.longDescription}</p>
              </div>
            </div>
          </div>
        </>
      );
    } else {
      return null;
    }
  }
}

export default ProductDetails;
