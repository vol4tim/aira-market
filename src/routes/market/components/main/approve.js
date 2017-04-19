import React, { Component } from 'react'

class Approve extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 10
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    this.props.onSubmit(this.props.market, this.props.token, this.state);
    event.preventDefault();
  }

  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading"><h4 className="panel-title">Approve</h4></div>
        <div className="panel-body">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label className="control-label">Value:</label>
              <input value={this.state.value} onChange={this.handleChange} name="value" type="text" className="form-control form-control-b" />
            </div>
            <button type="submit" className="btn btn-default">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Approve
