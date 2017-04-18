import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Main } from '../components/start';
import { setMarket } from '../../../modules/market/actions';

function mapStateToProps(state) {
  return {
    market: state.market.market
  }
}
function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators({
    setMarket
  }, dispatch)
  return {
    setMarket: actions.setMarket
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
