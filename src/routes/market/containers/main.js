import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Main } from '../components/main';
import { loadMarket, loadToken, loadAsks, loadBids, loadMyOrders, sell, buy, approve, onBuy, onSell, onSellConfirm } from '../../../modules/market/actions';

class Container extends Component {
  componentWillMount() {
    this.props.loadMarket(this.props.market);
    this.props.loadToken(this.props.market);
    this.props.loadAsks(this.props.market);
    this.props.loadBids(this.props.market);
    this.props.loadMyOrders(this.props.market);
  }
  render() {
    return <Main {...this.props} />
  }
}

function mapStateToProps(state) {
  return {
    market: state.market.market,
    isLoadMarket: state.market.isLoadMarket,
    isLoadToken: state.market.isLoadToken,
    isLoadAsks: state.market.isLoadAsks,
    isLoadBids: state.market.isLoadBids,
    isLoadMy: state.market.isLoadMy,
    info: state.market.info,
    asks: state.market.asks,
    bids: state.market.bids,
    myOrders: state.market.myOrders,
    token: state.market.token,
    names: state.market.names
  }
}
function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators({
    loadMarket,
    loadToken,
    loadAsks,
    loadBids,
    loadMyOrders,
    sell,
    buy,
    approve,
    onBuy,
    onSell,
    onSellConfirm
  }, dispatch)
  return {
    loadMarket: actions.loadMarket,
    loadToken: actions.loadToken,
    loadAsks: actions.loadAsks,
    loadBids: actions.loadBids,
    loadMyOrders: actions.loadMyOrders,
    sell: actions.sell,
    buy: actions.buy,
    approve: actions.approve,
    onBuy: actions.onBuy,
    onSell: actions.onSell,
    onSellConfirm: actions.onSellConfirm
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
