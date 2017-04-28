import React, { Component } from 'react'

class SellConfirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      candidates: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    this.props.onSubmit(this.props.market, Number(this.props.id), this.state);
    event.preventDefault();
  }

  render() {
    return (
      <form className="form-inline" onSubmit={this.handleSubmit}>
        <select value={this.state.candidates} onChange={this.handleChange} name="candidates" className="form-control" style={{ width: 80 }}>
          <option value="">---</option>
          {this.props.candidates.map((candidate, index) =>
            <option key={index} value={index}>{candidate}</option>
          )}
        </select>
        <button type="submit" className="btn btn-default"><span className="fa fa-chevron-right" /></button>
      </form>
    );
  }
}

export default SellConfirm
