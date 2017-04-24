import React from 'react'
import { Link } from 'react-router'
import Form from './form'

const Main = props => (
  <div>
    <Form onSubmit={props.setMarket} />
    {props.market !== '' &&
      <Link to="/">show market {props.market}</Link>
    }
  </div>
)

export default Main
