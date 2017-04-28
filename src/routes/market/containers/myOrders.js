import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import { Main } from '../components/myOrders';
import { loadMyOrders, onSellConfirm } from '../../../modules/market/actions';

class ContainerMyOrders extends Component {
  componentWillMount() {
    this.props.loadMyOrders(this.props.market);
  }
  render() {
    if (!this.props.isLoadMy) {
      return <Main {...this.props} />
    }
    return <p>...</p>
  }
}

function mapStateToProps(state) {
  const orders = _.filter(state.market.orders, (order) => {
    if (_.indexOf(state.market.myOrders, order.id) >= 0) {
      return true;
    }
    return false;
  });
  return {
    isLoadMy: state.market.isLoadMy,
    market: state.market.market,
    orders,
    names: state.market.names
  }
}
function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators({
    loadMyOrders,
    onSellConfirm
  }, dispatch)
  return {
    loadMyOrders: actions.loadMyOrders,
    onSellConfirm: actions.onSellConfirm
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContainerMyOrders)
