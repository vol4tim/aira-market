import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import { Main } from '../components/bids';
import { loadBids, onBuy, approve, setName } from '../../../modules/air/actions';

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
    isLoadBids: state.air.isLoadBids,
    market: state.air.market,
    orders: _.sortBy(_.filter(state.air.orders, { type: 'bids' }), ['price']),
    names: state.air.names,
    approve: state.air.tokenBase.approve,
    token: state.air.tokenBase.address
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
