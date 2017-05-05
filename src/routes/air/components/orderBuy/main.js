import React, { Component } from 'react'
import _ from 'lodash'
import BigNumber from 'bignumber.js'

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getApprove() {
    if (Number(this.state.value) > 0) {
      const approve = new BigNumber(this.props.approve);
      let quoteValue = new BigNumber(0);
      let value = new BigNumber(this.state.value);
      const orders = _.filter(this.props.orders, { type: 'bids' });
      _.forEach(orders, (order) => {
        if (value > 0) {
          if (order.value >= value) {
            const orderPrice = new BigNumber(order.price);
            quoteValue = quoteValue.plus(orderPrice.times(value));
            value = new BigNumber(0);
          } else {
            const orderPrice = new BigNumber(order.price);
            const orderValue = new BigNumber(order.value);
            quoteValue = quoteValue.plus(orderPrice.times(orderValue));
            value = value.minus(orderValue);
          }
        }
      })
      return [value.toNumber(), quoteValue.minus(approve).toNumber(), quoteValue.toNumber()]
    }
    return false
  }

  handleChange(event) {
    let value = event.target.value;
    if (value !== '') {
      value = Number(value);
      if (event.target.name === 'value') {
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
    if (approve && approve[0] > 0) {
      btn = <div className="alert alert-danger">The market does not have enough Air tokens</div>
    } else if (approve && approve[1] <= 0) {
      btn = (
        <div>
          <span>Sum &asymp; {approve[2]} ETH</span>
          &nbsp;
          <button type="submit" className="btn btn-default">Buy</button>
        </div>
      )
    } else if (approve) {
      btn = (
        <div>
          <span>Sum &asymp; {approve[2]} ETH</span>
          &nbsp;
          <button
            className="btn btn-warning"
            onClick={(e) => {
              this.props.onApprove(
                this.props.market,
                this.props.token,
                approve[1]
              );
              e.preventDefault();
            }}
          >
            Approve {approve[1]} ETH
          </button>
        </div>
      )
    }
    return (
      <div className="panel panel-default">
        <div className="panel-heading"><h4 className="panel-title">Buy Air</h4></div>
        <div className="panel-body">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label className="control-label">Amount of Air tokens:</label>
              <div className="input-group">
                <input value={this.state.value} onChange={this.handleChange} name="value" type="text" className="form-control form-control-b" />
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
