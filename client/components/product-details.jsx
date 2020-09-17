import React from 'react';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
  }

  componentDidMount() {
    fetch('/api/products/1')
      .then(result => this.setState({
        product: result
      }))
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    if (this.state.product) {
      return <h1 className="text-center">Hello from details</h1>;
    } else {
      return null;
    }
  }
}

export default ProductDetails;
