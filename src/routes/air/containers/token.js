import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Main } from '../components/token';
import { loadToken } from '../../../modules/air/actions';

class ContainerToken extends Component {
  componentWillMount() {
    this.props.loadToken(this.props.tokenAddress, this.props.type, this.props.market);
  }
  render() {
    return <Main {...this.props} />
  }
}

function mapStateToProps(state, props) {
  let token;
  let isLoadToken;
  let tokenAddress;
  if (props.type === 'base') {
    token = state.air.tokenBase
    isLoadToken = state.air.isLoadTokenBase
    tokenAddress = state.air.info.base
  } else {
    token = state.air.tokenQuote
    isLoadToken = state.air.isLoadTokenQuote
    tokenAddress = state.air.info.quote
  }
  return {
    isLoadToken,
    token,
    type: props.type,
    tokenAddress,
    market: state.air.market
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
