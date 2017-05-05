import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import { Main } from '../components/orderBuy';
import { orderBuy, approve } from '../../../modules/air/actions';

function mapStateToProps(state) {
  return {
    market: state.air.market,
    token: state.air.tokenQuote.address,
    approve: state.air.tokenQuote.approve,
    orders: _.sortBy(_.filter(state.air.orders, { type: 'bids' }), ['price'])
  }
}
function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators({
    orderBuy,
    approve
  }, dispatch)
  return {
    onSubmit: actions.orderBuy,
    onApprove: actions.approve
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
