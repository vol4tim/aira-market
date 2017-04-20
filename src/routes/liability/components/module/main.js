import React from 'react'

const Main = props => (
  (<div>
    <h1>Liability</h1>
    <p>address: {props.module.address}</p>
    <p>promisor: {props.module.promisor}</p>
    <p>promisee: {props.module.promisee}</p>
    <div>
      <h2>Events</h2>
      {props.module.logs.map((item, index) =>
        <div key={index} className="list-group-item">
          {item.name} - {item.result.hash.replace('0x', '0x1220')}
        </div>
      )}
    </div>
  </div>)
)

export default Main
