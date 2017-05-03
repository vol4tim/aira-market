import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Main } from '../components/sell';
import { sell, approve } from '../../../modules/air/actions';

function mapStateToProps(state) {
  return {
    market: state.air.market,
    token: state.air.tokenBase.address,
    approve: state.air.tokenBase.approve
  }
}
function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators({
    sell,
    approve
  }, dispatch)
  return {
    onSubmit: actions.sell,
    onApprove: actions.approve
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
