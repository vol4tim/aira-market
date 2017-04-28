import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Main } from '../components/token';
import { loadToken } from '../../../modules/market/actions';

class ContainerToken extends Component {
  componentWillMount() {
    this.props.loadToken(this.props.market);
  }
  render() {
    return <Main {...this.props} />
  }
}

function mapStateToProps(state) {
  return {
    isLoadToken: state.market.isLoadToken,
    market: state.market.market,
    token: state.market.token
  }
}
function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators({
    loadToken
  }, dispatch)
  return {
    loadToken: actions.loadToken
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContainerToken)
