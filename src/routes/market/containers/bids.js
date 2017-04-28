import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
// import { createSelector } from 'reselect'
import { Main } from '../components/bids';
import { loadBids, onBuy, approve, setName } from '../../../modules/market/actions';

class ContainerBids extends Component {
  componentWillMount() {
    this.props.loadBids(this.props.market);
  }
  render() {
    if (!this.props.isLoadBids) {
      // console.log('render');
      // return (<div>
      //   <button onClick={() => this.props.setName(Math.random(), Math.random())}>asd</button>
      //   <Main {...this.props} />
      // </div>)
      return <Main {...this.props} />
    }
    return <p>...</p>
  }
}

// const getOrders = (state, props) => _.filter(state.market.orders, { type: props.type })
// const getNames = state => state.market.names
// const getType = (state, props) => props.type

// const getOrdersType = createSelector(
//   getType,
//   getOrders,
//   (type, orders) => {
//     switch (type) {
//       case 'bids':
//         return _.sortBy(orders, ['price'])
//       case 'asks':
//         return _.sortBy(orders, ['price'])
//       default:
//         return orders
//     }
//   }
// )

// const getNamesType = createSelector(
//   getNames,
//   names => _.memoize((orders) => {
//     let addresses = []
//     _.forEach(orders, (item) => {
//       addresses = addresses.concat(item.promisee)
//     });
//     addresses = _.uniq(addresses);
//     return _.filter(names, (name, address) => {
//       if (_.indexOf(addresses, address) >= 0) {
//         return true;
//       }
//       return false;
//     });
//   })
// )

function mapStateToProps(state) {
  // const orders = getOrdersType(state, { type: 'bids' });
  // const names = getNamesType(state)(orders);
  // console.log('names', names);
  // console.log('orders', orders);
  const orders = _.sortBy(_.filter(state.market.orders, { type: 'bids' }), ['price']);
  const names = state.market.names;
  return {
    isLoadBids: state.market.isLoadBids,
    market: state.market.market,
    orders,
    names,
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
