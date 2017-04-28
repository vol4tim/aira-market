import React from 'react'
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
        <div className="collapse navbar-collapse" id="navcol-1">
          <ul className="nav navbar-nav navbar-right">
            <li role="presentation"><Link to="/liability">Liability</Link></li>
            <li role="presentation"><Link to="/change-market">Change market</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Header
