/* eslint react/jsx-no-target-blank: 0 */
import React from 'react'
import Name from './name'

const Main = props => (
  (<div>
    <h1>Liability</h1>
    <p><strong>address</strong>: <a href={'https://kovan.etherscan.io/address/' + props.module.address} target="_blank">{props.module.address}</a></p>
    <p><strong>promisor</strong>: <a href={'https://kovan.etherscan.io/address/' + props.module.promisor} target="_blank">{props.module.promisor}</a></p>
    <p>
      <strong>promisee</strong>: <a href={'https://kovan.etherscan.io/address/' + props.module.promisee} target="_blank">{props.module.promisee}</a> ( <Name names={props.names} address={props.module.promisee} /> )
    </p>
    <div>
      <h2>Results</h2>
      {props.module.logs.map((item, index) =>
        <div key={index} className="list-group-item">
          <span className="label label-success">{item.result.date}</span><br />
          {item.name} - <a target="_blank" href={'https://ipfs.io/ipfs/' + item.result.hash}>{item.result.hash}</a>
        </div>
      )}
    </div>
  </div>)
)

export default Main
