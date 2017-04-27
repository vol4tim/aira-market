import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import cookie from 'react-cookie'
import Notifications from 'react-notification-system-redux';
import { getWeb3, isAccounts, runListener } from '../../utils/web3'
import { setMarket } from '../../modules/market/actions';

import Header from '../components/app/header'
import Footer from '../components/app/footer'

import './style.css'

class App extends Component {
  componentWillMount() {
    const address = cookie.load('market_address')
    if (address) {
      this.props.setMarket(address)
    }
    runListener();
  }

  render() {
    // const content = this.props.children
    let content
    if (getWeb3()) {
      if (isAccounts()) {
        content = this.props.children
      } else {
        content = <p>нет аккаунтов</p>
      }
    } else {
      content = <p>нужен mist</p>
    }

    const style = {
      Containers: {
        DefaultStyle: {
          width: '530px',
        }
      },
      NotificationItem: {
        DefaultStyle: {
          margin: '10px 5px 2px 1px'
        },
      }
    };

    return (<div>
      <Header title={this.props.title} />
      <div className="container" id="maincontainer">
        {content}
      </div>
      <Footer />
      <Notifications
        notifications={this.props.notifications}
        style={style}
        allowHTML
      />
    </div>)
  }
}

function mapStateToProps(state) {
  return {
    title: state.app.title,
    flash_message: state.app.flash_message,
    notifications: state.notifications
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

export default connect(mapStateToProps, mapDispatchToProps)(App)
