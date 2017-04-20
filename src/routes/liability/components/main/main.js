import React from 'react'
import { Link } from 'react-router'

const Main = props => (
  (<div>
    <h1>Liability</h1>
    <div className="list-group" style={{ marginBottom: 0 }}>
      {props.items.map((item, index) =>
        <div key={index} className="list-group-item">
          <Link to={'/liability/' + item.address}>
            {item.address}
          </Link>
        </div>
      )}
    </div>
  </div>)
)

export default Main
