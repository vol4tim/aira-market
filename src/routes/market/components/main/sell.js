import React, { Component } from 'react'

class Sell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      promisee: '0x1',
      price: 10
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    this.props.onSubmit(this.props.market, this.state);
    event.preventDefault();
  }

  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">Sell</div>
        <div className="panel-body">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <span>Promisee:</span>
              <input value={this.state.promisee} onChange={this.handleChange} name="promisee" type="text" className="form-control" />
            </div>
            <div className="form-group">
              <span>Price:</span>
              <input value={this.state.price} onChange={this.handleChange} name="price" type="text" className="form-control" />
            </div>
            <button type="submit" className="btn btn-default">Sell</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Sell
