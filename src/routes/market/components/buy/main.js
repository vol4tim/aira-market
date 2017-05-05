import React, { Component } from 'react'
import BigNumber from 'bignumber.js'

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: 100
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getApprove() {
    if (Number(this.state.price) > 0) {
      const price = new BigNumber(this.state.price);
      const approve = new BigNumber(this.props.approve);
      return price.minus(approve).toNumber();
    }
    return false;
  }

  handleChange(event) {
    let value = event.target.value;
    if (value !== '') {
      value = Number(value);
      if (event.target.name === 'price') {
        value = new BigNumber(value)
        value = value.toFixed()
      }
    }
    this.setState({ [event.target.name]: value });
  }

  handleSubmit(event) {
    this.props.onSubmit(this.props.market, this.state);
    event.preventDefault();
  }

  render() {
    const approve = this.getApprove();
    let btn = <div className="alert alert-danger">Form is not filled out correctly</div>;
    if (approve && approve <= 0) {
      btn = (
        <button type="submit" className="btn btn-default">Buy</button>
      )
    } else if (approve) {
      btn = (
        <button
          className="btn btn-warning"
          onClick={(e) => {
            this.props.onApprove(
              this.props.market,
              this.props.token,
              approve
            );
            e.preventDefault();
          }}
        >
          Add to approve {approve} AIR
        </button>
      )
    }
    return (
      <div className="panel panel-default">
        <div className="panel-heading"><h4 className="panel-title">Create new ASK lot for purchase ONE robot liability on Sensor market</h4></div>
        <div className="panel-body">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label className="control-label">Amount of Air tokens to ASK one robot liability:</label>
              <div className="input-group">
                <input value={this.state.price} onChange={this.handleChange} name="price" type="text" className="form-control form-control-b" />
                <div className="input-group-addon">AIR</div>
              </div>
            </div>
            {btn}
          </form>
        </div>
      </div>
    );
  }
}

export default Main
