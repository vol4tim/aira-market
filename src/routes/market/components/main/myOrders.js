import React from 'react'
import SellConfirm from './sellConfirm'
import Name from './name'

const MyOrders = props => (
  (<div className="panel panel-default">
    <div className="panel-heading"><h4 className="panel-title">My active orders</h4></div>
    <div className="panel-body">
      <table className="table table-hover">
        <thead>
          <tr>
            <th>type</th>
            <th>price</th>
            <th>beneficiary</th>
            <th>promisee</th>
            <th>name</th>
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
                <ul>
                  {order.beneficiary.map((address, index2) =>
                    <li key={index2}>
                      <a href={'https://kovan.etherscan.io/address/' + address} target="_blank">
                        <small>{address}</small>
                      </a>
                    </li>
                  )}
                </ul>
              </td>
              <td>
                <ul>
                  {order.promisee.map((address, index2) =>
                    <li key={index2}>
                      <a href={'https://kovan.etherscan.io/address/' + address} target="_blank">
                        <small>{address}</small>
                      </a>
                    </li>
                  )}
                </ul>
              </td>
              <td>
                <ul>
                  {order.ipfs.map((hash, index2) =>
                    <li key={index2}>
                      <Name hash names={props.names} address={order.promisee[index2]} />
                    </li>
                  )}
                </ul>
              </td>
              <td>
                <a href={'https://kovan.etherscan.io/address/' + order.promisor} target="_blank">
                  <small>{order.promisor}</small>
                </a>
              </td>
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
