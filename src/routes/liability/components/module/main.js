/* eslint react/jsx-no-target-blank: 0 */
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
          {item.name} - <a target="_blank" href={'https://ipfs.io/ipfs/' + item.result.hash}>{item.result.hash}</a>
        </div>
      )}
    </div>
  </div>)
)

export default Main
