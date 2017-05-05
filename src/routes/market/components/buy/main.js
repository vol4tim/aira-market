import React, { Component } from 'react'

class Main extends Component {
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
        <div className="panel-heading"><h4 className="panel-title">Create new ASK lot for purchase ONE robot liability on Sensor market</h4></div>
        <div className="panel-body">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label className="control-label">Amount of Air tokens to ASK one robot liability:</label>
              <input value={this.state.price} onChange={this.handleChange} name="price" type="text" className="form-control form-control-b" />
            </div>
            {this.props.approve >= Number(this.state.price) ?
              <button type="submit" className="btn btn-default">Buy</button>
              :
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  this.props.onApprove(
                    this.props.market,
                    this.props.token,
                    Number(this.state.price) - this.props.approve
                  );
                  e.preventDefault();
                }}
              >
                Add to approve {Number(this.state.price) - this.props.approve} Air
              </button>
            }
          </form>
        </div>
      </div>
    );
  }
}

export default Main
