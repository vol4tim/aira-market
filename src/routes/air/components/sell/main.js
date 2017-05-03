import React, { Component } from 'react'

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
      price: 1
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
        <div className="panel-heading"><h4 className="panel-title">Sell Air</h4></div>
        <div className="panel-body">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label className="control-label">Value:</label>
              <input value={this.state.value} onChange={this.handleChange} name="value" type="text" className="form-control form-control-b" />
            </div>
            <div className="form-group">
              <label className="control-label">Price:</label>
              <input value={this.state.price} onChange={this.handleChange} name="price" type="text" className="form-control form-control-b" />
            </div>
            {this.props.approve >= Number(this.state.value) ?
              <button type="submit" className="btn btn-default">Sell</button>
              :
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  this.props.onApprove(
                    this.props.market,
                    this.props.token,
                    Number(this.state.value) - this.props.approve
                  );
                  e.preventDefault();
                }}
              >
                Approve {Number(this.state.value) - this.props.approve}
              </button>
            }
          </form>
        </div>
      </div>
    );
  }
}

export default Main
