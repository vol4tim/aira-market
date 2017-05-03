import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import { Main } from '../components/asks';
import { loadAsks } from '../../../modules/air/actions';

class ContainerAsks extends Component {
  componentWillMount() {
    this.props.loadAsks(this.props.market);
  }
  render() {
    if (!this.props.isLoadAsks) {
      return <Main {...this.props} />
    }
    return <p>...</p>
  }
}

function mapStateToProps(state) {
  const orders = _.reverse(_.sortBy(_.filter(state.air.orders, { type: 'asks' }), ['price']));
  return {
    isLoadAsks: state.air.isLoadAsks,
    market: state.air.market,
    orders,
    names: state.air.names
  }
}
function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators({
    loadAsks
  }, dispatch)
  return {
    loadAsks: actions.loadAsks
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContainerAsks)
