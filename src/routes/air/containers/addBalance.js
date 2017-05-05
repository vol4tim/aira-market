import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Main } from '../components/addBalance';
import { addBalance } from '../../../modules/air/actions';

function mapStateToProps(state) {
  return {
    token: state.air.tokenQuote.address,
    balance: state.air.tokenQuote.balanceEth
  }
}
function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators({
    addBalance
  }, dispatch)
  return {
    onSubmit: actions.addBalance
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
