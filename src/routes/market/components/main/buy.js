import React, { Component } from 'react'

class Buy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: 100
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
        <div className="panel-heading">Buy</div>
        <div className="panel-body">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <span>Price:</span>
              <input value={this.state.price} onChange={this.handleChange} name="price" type="text" className="form-control" />
            </div>
            {this.props.approve >= Number(this.state.price) ?
              <button type="submit" className="btn btn-default">Buy</button>
              :
              <p>Not enough approve</p>
            }
          </form>
        </div>
      </div>
    );
  }
}

export default Buy
