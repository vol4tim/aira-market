import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import { Main } from '../components/module';
import { loadModule } from '../../../modules/liability/actions';

class Container extends Component {
  componentWillMount() {
    if (!this.props.module.isLoad) {
      this.props.loadModule(this.props.module.address);
    }
  }
  render() {
    if (this.props.module.isLoad) {
      return <Main {...this.props} />
    }
    return <p>...</p>
  }
}

function mapStateToProps(state, props) {
  let module = _.find(state.liability.items, ['address', props.params.address])
  if (_.isUndefined(module)) {
    module = {
      isLoad: false,
      address: props.params.address
    }
  }
  return {
    module,
    names: state.market.names
  }
}
function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators({
    loadModule
  }, dispatch)
  return {
    loadModule: actions.loadModule
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
