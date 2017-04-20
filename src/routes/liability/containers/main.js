import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Main } from '../components/main';
import { loadModules } from '../../../modules/liability/actions';

class Container extends Component {
  componentWillMount() {
    if (!this.props.isLoad) {
      this.props.loadModules();
    }
  }
  render() {
    if (this.props.isLoad) {
      return (<div>
        <Main {...this.props} />
      </div>)
    }
    return <p>...</p>
  }
}

function mapStateToProps(state) {
  return {
    items: state.liability.items,
    isLoad: state.liability.isLoad
  }
}
function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators({
    loadModules
  }, dispatch)
  return {
    loadModules: actions.loadModules
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
