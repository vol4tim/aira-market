import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Token from './token';
import AddBalance from './addBalance';
import Buy from './buy';
import Sell from './sell';
import OrderBuy from './orderBuy';
import OrderSell from './orderSell';
import Bids from './bids';
import Asks from './asks';
import EthLink from '../../../shared/components/common/ethLink';
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
        <hr />
        <p>Market smart contract address on KOVAN network: <EthLink label="info" address={this.props.market} /></p>
        {!this.props.isLoadMarket ?
          <div className="row">
            <div className="col-md-6">
              <Token type="base" />
            </div>
            <div className="col-md-6">
              <Token type="quote" />
              <AddBalance />
            </div>
          </div>
          :
          <p>...</p>
        }
        <h2>Add order</h2>
        <div className="row">
          <div className="col-md-6">
            <Sell />
          </div>
          <div className="col-md-6">
            <Buy />
          </div>
        </div>
        <h2>Close order</h2>
        <div className="row">
          <div className="col-md-6">
            <OrderBuy />
          </div>
          <div className="col-md-6">
            <OrderSell />
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
    market: state.air.market,
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
