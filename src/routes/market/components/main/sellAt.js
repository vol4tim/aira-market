import React, { Component } from 'react'

class SellAt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      promisee: '0x1'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    this.props.onSubmit(this.props.market, this.props.index, this.state);
    event.preventDefault();
  }

  render() {
    return (
      <form className="form-inline" onSubmit={this.handleSubmit}>
        <input value={this.state.promisee} onChange={this.handleChange} name="promisee" type="text" className="form-control" style={{ width: 80 }} />
        <button type="submit" className="btn btn-default"><span className="glyphicon glyphicon-download-alt" /></button>
      </form>
    );
  }
}

export default SellAt
