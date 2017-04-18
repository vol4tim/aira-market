import React from 'react'
import SellAt from './sellAt'

const Asks = props => (
  (<div className="panel panel-default">
    <div className="panel-body">
      <table className="table table-hover">
        <thead>
          <tr>
            <th>price</th>
            <th>promisor</th>
            <th>beneficiary</th>
            <th>promisee</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {props.orders.map((order, index) =>
            <tr key={index}>
              <td><span className="price">{order.price}</span></td>
              <td><small className="promisor">{order.promisor}</small></td>
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
              <td>
                <SellAt market={props.market} index={order.index} onSubmit={props.onSell} />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>)
)

export default Asks
