import React from 'react'

const Main = props => (
  (<div>
    {!props.isLoadToken ?
      <div className="row">
        <div className="col-md-12">
          {props.type === 'base' ?
            <p>Token Air: <span className="label label-info">{props.token.address}</span></p>
            :
            <p>Token Ether: <span className="label label-info">{props.token.address}</span></p>
          }
          <p>Balance: {props.token.balance}</p>
          <p>Approve: {props.token.approve}</p>
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
