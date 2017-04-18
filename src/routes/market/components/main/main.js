import React from 'react'
import Approve from './approve'
import Sell from './sell'
import Buy from './buy'
import Asks from './asks'
import Bids from './bids'
import MyOrders from './myOrders'

const Main = props => (
  (<div>
    <h1>Market</h1>
    <span>{props.market}</span>
    <hr />
    <div className="row">
      <div className="col-md-6">
        <p>Token: {props.token.address}</p>
        <p>Balance: {props.token.balance}</p>
        <p>Approve: {props.token.approve}</p>
      </div>
      <div className="col-md-6">
        <Approve market={props.market} token={props.token.address} onSubmit={props.approve} />
      </div>
    </div>
    <div className="row">
      <div className="col-md-6">
        <Sell market={props.market} onSubmit={props.sell} />
      </div>
      <div className="col-md-6">
        <Buy market={props.market} approve={props.token.approve} onSubmit={props.buy} />
      </div>
    </div>
    <div className="row">
      <div className="col-md-12">
        <ul className="nav nav-tabs">
          <li className="active"><a href="#1" data-toggle="tab">Buy orders</a></li>
          <li><a href="#2" data-toggle="tab">Sell orders</a></li>
        </ul>
        <div className="tab-content">
          <div className="tab-pane active" id="1">
            <Bids
              market={props.market}
              orders={props.bids}
              approve={props.token.approve}
              onBuy={props.onBuy}
            />
          </div>
          <div className="tab-pane" id="2">
            <Asks market={props.market} orders={props.asks} onSell={props.onSell} />
          </div>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-md-12">
        <MyOrders
          market={props.market}
          orders={props.myOrders}
          onSellConfirm={props.onSellConfirm}
        />
      </div>
    </div>
  </div>)
)

export default Main
