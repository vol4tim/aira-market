import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Main } from '../components/buy';
import { buy, approve } from '../../../modules/market/actions';

function mapStateToProps(state) {
  return {
    market: state.market.market,
    token: state.market.token.address,
    approve: state.market.token.approve
  }
}
function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators({
    buy,
    approve
  }, dispatch)
  return {
    onSubmit: actions.buy,
    onApprove: actions.approve
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
