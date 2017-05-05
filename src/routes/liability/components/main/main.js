import React from 'react'
import { Link } from 'react-router'

const Main = props => (
  (<div>
    <button className="btn btn-warning pull-right" onClick={() => props.refresh(props.market)}>Refresh</button>
    <h1>Purchase history of robots liabilities</h1>
    <div className="list-group" style={{ marginBottom: 0 }}>
      {props.items.map((item, index) =>
        <div key={index} className="list-group-item">
          <b>Personal robot liability smart contract</b>:
          &nbsp;
          <Link to={'/liability/' + item.address}>
            {item.address}
          </Link>
        </div>
      )}
    </div>
  </div>)
)

export default Main
