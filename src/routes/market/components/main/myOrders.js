import React from 'react'
import SellConfirm from './sellConfirm'

const MyOrders = props => (
  (<div className="panel panel-default">
    <div className="panel-heading">My active orders:</div>
    <div className="panel-body">
      <table className="table table-hover">
        <thead>
          <tr>
            <th>type</th>
            <th>price</th>
            <th>beneficiary</th>
            <th>promisee</th>
            <th>promisor</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {props.orders.map((order, index) =>
            <tr key={index}>
              <td>
                {!order.closed &&
                  <b style={{ color: (order.type === 'buy') ? 'green' : 'red' }}>{order.type}</b>
                }
              </td>
              <td>{order.price}</td>
              <td>
                {order.beneficiary.map((beneficiary, index2) =>
                  <small key={index2} className="beneficiary">{beneficiary}</small>
                )}
              </td>
              <td>
                {order.promisee.map((promisee, index2) =>
                  <small key={index2} className="promisee">{promisee}</small>
                )}
              </td>
              <td><small className="promisee">{order.promisor}</small></td>
              <td>
                {!order.closed && order.type === 'buy' ?
                  <SellConfirm
                    market={props.market}
                    index={order.index}
                    candidates={order.beneficiary}
                    onSubmit={props.onSellConfirm}
                  />
                  :
                  <p>-</p>
                }
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>)
)

export default MyOrders
