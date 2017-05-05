import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Token from './token';
import Buy from './buy';
import Bids from './bids';
import Asks from './asks';
import MyOrders from './myOrders';
import EthLink from '../../../shared/components/common/ethLink';
import { loadMarket } from '../../../modules/market/actions';

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
        <hr />
        <p>Sensor market smart contract address on KOVAN network: <EthLink label="info" address={this.props.market} /></p>
        <Token />
        <div className="row">
          <div className="col-md-12">
            <Buy />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <ul className="nav nav-tabs">
              <li className="active"><a href="#1" data-toggle="tab">Buy</a></li>
              <li><a href="#2" data-toggle="tab">Sell</a></li>
            </ul>
            <div className="tab-content">
              <div className="tab-pane active" id="1">
                <Bids />
              </div>
              <div className="tab-pane" id="2">
                <Asks />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <MyOrders />
          </div>
        </div>
      </div>
    </div>)
  }
}

function mapStateToProps(state) {
  return {
    isLoadMarket: state.market.isLoadMarket,
    market: state.market.market,
    info: state.market.info
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
