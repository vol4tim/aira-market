import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Token from './token';
import Buy from './buy';
import Bids from './bids';
import Asks from './asks';
import { loadMarket } from '../../../modules/air/actions';

class Container extends Component {
  componentWillMount() {
    this.props.loadMarket(this.props.market);
  }
  render() {
    return (<div>
      <div>
        {!this.props.isLoadMarket ?
          <h1>{this.props.info.name}</h1>
          :
          <h1>...</h1>
        }
        <span className="label label-info">{this.props.market}</span>
        <hr />
        {!this.props.isLoadMarket ?
          <div className="row">
            <div className="col-md-6">
              <Token type="base" />
            </div>
            <div className="col-md-6">
              <Token type="quote" />
            </div>
          </div>
          :
          <p>...</p>
        }
        <h2>Add order</h2>
        <div className="row">
          <div className="col-md-6">
            <Buy />
          </div>
          <div className="col-md-6">
            <Buy />
          </div>
        </div>
        <h2>Orders</h2>
        <div className="row">
          <div className="col-md-6">
            <Bids />
          </div>
          <div className="col-md-6">
            <Asks />
          </div>
        </div>
      </div>
    </div>)
  }
}

function mapStateToProps(state) {
  return {
    isLoadMarket: state.air.isLoadMarket,
    market: '0xa50c2203690f52490a449991dEf2cDC3A401Db14',
    info: state.air.info
  }
}
function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators({
    loadMarket
  }, dispatch)
  return {
    loadMarket: actions.loadMarket
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
