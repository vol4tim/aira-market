import React, { Component } from 'react'

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '0x1'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    this.props.onSubmit(this.state.address);
    event.preventDefault();
  }

  render() {
    return (
      <form className="form-inline" onSubmit={this.handleSubmit}>
        <input value={this.state.address} onChange={this.handleChange} name="address" type="text" className="form-control" />
        <button type="submit" className="btn btn-default">set market</button>
      </form>
    );
  }
}

export default Form
