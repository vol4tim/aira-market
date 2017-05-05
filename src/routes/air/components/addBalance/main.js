import React, { Component } from 'react'

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    this.props.onSubmit(this.props.token, this.state);
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <p>Your Ether balance on KOVAN network: <b>{this.props.balance} ETH</b></p>
        <form className="form-inline" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label className="sr-only">Amount (in dollars)</label>
            <div className="input-group">
              <input value={this.state.value} onChange={this.handleChange} name="value" type="text" className="form-control form-control-b" />
              <div className="input-group-addon">ETH</div>
            </div>
          </div>
          &nbsp;
          {this.props.balance >= Number(this.state.value) ?
            <button type="submit" className="btn btn-default">Add</button>
            :
            <button type="submit" className="btn btn-default" disabled>Add</button>
          }
        </form>
      </div>
    );
  }
}

export default Main
