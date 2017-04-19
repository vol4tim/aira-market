import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const Header = function Header(props) {
  return (
    <nav className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <Link to="/" className="navbar-brand navbar-link">
            <img src="assets/img/aira-logo.svg" className="navbar-brand-img d-ib-mid" role="presentation" />
            <span className="d-ib-mid">{props.title}</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}

Header.propTypes = {
  title: PropTypes.string.isRequired
}

export default Header
