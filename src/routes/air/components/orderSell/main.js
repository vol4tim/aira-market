import React, { Component } from 'react'
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
      const value = new BigNumber(this.state.value);
      const approve = new BigNumber(this.props.approve);
      return value.minus(approve).toNumber();
    }
    return false;
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
    if (approve && approve <= 0) {
      btn = (
        <button type="submit" className="btn btn-default">Sell</button>
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
        <div className="panel-heading"><h4 className="panel-title">Sell Air</h4></div>
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
