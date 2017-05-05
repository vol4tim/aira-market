import React from 'react'
import EthLink from '../../../../shared/components/common/ethLink';

const Main = props => (
  (<div>
    {!props.isLoadToken ?
      <div className="row">
        {props.type === 'base' ?
          <div className="col-md-12">
            <p>Air smart contract address on KOVAN network: <EthLink label="info" type="token" address={props.token.address} /></p>
            <p>Your Air token balance on KOVAN network: <b>{props.token.balance} AIR</b></p>
            <p>
              Amount of approved Air tokens for Sensor market lots purchase:
              &nbsp;
              <b>{props.token.approve} AIR</b>
            </p>
          </div>
          :
          <div className="col-md-12">
            <p>Ether smart contract address on KOVAN network: <EthLink label="info" type="token" address={props.token.address} /></p>
            <p>Your Ether token balance on KOVAN network: <b>{props.token.balance} ETH</b></p>
            <p>
              Amount of approved Ether tokens for Sensor market lots purchase:
              &nbsp;
              <b>{props.token.approve} ETH</b>
            </p>
          </div>
        }
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
