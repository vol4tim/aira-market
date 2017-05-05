/* eslint react/jsx-no-target-blank: 0 */
import React from 'react'
import Name from '../../../market/components/common/name'
import EthLink from '../../../market/components/common/ethLink'

const Main = props => (
  (<div>
    <h1>Personal robot liability smart contract</h1>
    <p>
      <strong>Robot liability smart contract address</strong>:
      &nbsp;
      <EthLink address={props.module.address} />
    </p>
    <p><strong>Promisor</strong>: <EthLink address={props.module.promisor} /></p>
    <p>
      <strong>Promisee</strong>:
      &nbsp;
      <EthLink address={props.module.promisee} />
      &nbsp;
      ( <Name names={props.names} address={props.module.promisee} /> )
    </p>
    <div>
      <h2>Results</h2>
      {props.module.logs.map((item, index) =>
        <div key={index} className="list-group-item">
          <span className="label label-success">{item.result.date}</span><br />
          Robot work result stored on IPFS: <a target="_blank" href={'https://ipfs.io/ipfs/' + item.result.hash}>{item.result.hash}</a>
        </div>
      )}
    </div>
  </div>)
)

export default Main
