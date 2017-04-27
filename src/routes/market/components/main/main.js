import React from 'react'
import Buy from './buy'
import Asks from './asks'
import Bids from './bids'
import MyOrders from './myOrders'

const Main = props => (
  (<div>
    {!props.isLoadMarket ?
      <h1>{props.info.name}</h1>
      :
      <h1>...</h1>
    }
    <span className="label label-info">{props.market}</span>
    <hr />
    {!props.isLoadToken ?
      <div className="row">
        <div className="col-md-12">
          <p>Token: <span className="label label-info">{props.token.address}</span></p>
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
    <div className="row">
      <div className="col-md-12">
        <Buy
          market={props.market}
          approve={props.token.approve}
          token={props.token.address}
          onSubmit={props.buy}
          onApprove={props.approve}
        />
      </div>
    </div>
    <div className="row">
      <div className="col-md-12">
        <ul className="nav nav-tabs">
          <li className="active"><a href="#1" data-toggle="tab">Buy</a></li>
          <li><a href="#2" data-toggle="tab">Sell</a></li>
        </ul>
        <div className="tab-content">
          <div className="tab-pane active" id="1">
            {!props.isLoadBids ?
              <Bids
                market={props.market}
                orders={props.bids}
                names={props.names}
                approve={props.token.approve}
                token={props.token.address}
                onBuy={props.onBuy}
                onApprove={props.approve}
              />
              :
              <p>...</p>
            }
          </div>
          <div className="tab-pane" id="2">
            {!props.isLoadAsks ?
              <Asks
                market={props.market}
                orders={props.asks}
                names={props.names}
                onSell={props.onSell}
              />
              :
              <p>...</p>
            }
          </div>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-md-12">
        {!props.isLoadMy ?
          <MyOrders
            market={props.market}
            orders={props.myOrders}
            names={props.names}
            onSellConfirm={props.onSellConfirm}
          />
          :
          <p>...</p>
        }
      </div>
    </div>
  </div>)
)

export default Main
