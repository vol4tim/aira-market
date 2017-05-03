import React from 'react'
import EthLink from '../common/ethLink';

const Main = props => (
  (<div>
    {!props.isLoadToken ?
      <div className="row">
        <div className="col-md-12">
          <p>Air (Market token) smart contract address on KOVAN network: <EthLink label="info" address={props.token.address} /></p>
          <p>Your Air token balance on KOVAN network: <b>{props.token.balance} Air</b></p>
          <p>
            Amount of approved Air tokens for Sensor market lots purchase:
            &nbsp;
            <b>{props.token.approve} Air</b>
          </p>
        </div>
      </div>
      :
      <div className="row">
        <div className="col-md-12">
          <p>...</p>
        </div>
      </div>
    }
  </div>)
)

export default Main
