import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import { Main } from '../components/bids';
import { loadBids, onBuy, approve, setName } from '../../../modules/market/actions';

class ContainerBids extends Component {
  componentWillMount() {
    this.props.loadBids(this.props.market);
  }
  render() {
    if (!this.props.isLoadBids) {
      return <Main {...this.props} />
    }
    return <p>...</p>
  }
}

function mapStateToProps(state) {
  return {
    isLoadBids: state.market.isLoadBids,
    market: state.market.market,
    orders: _.sortBy(_.filter(state.market.orders, { type: 'bids' }), ['price']),
    names: state.market.names,
    approve: state.market.token.approve,
    token: state.market.token.address
  }
}
function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators({
    loadBids,
    onBuy,
    approve,
    setName
  }, dispatch)
  return {
    loadBids: actions.loadBids,
    onBuy: actions.onBuy,
    onApprove: actions.approve,
    setName: actions.setName
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContainerBids)
