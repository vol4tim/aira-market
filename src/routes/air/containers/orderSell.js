import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Main } from '../components/orderSell';
import { orderSell, approve } from '../../../modules/air/actions';

function mapStateToProps(state) {
  return {
    market: state.air.market,
    token: state.air.tokenBase.address,
    approve: state.air.tokenBase.approve
  }
}
function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators({
    orderSell,
    approve
  }, dispatch)
  return {
    onSubmit: actions.orderSell,
    onApprove: actions.approve
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
