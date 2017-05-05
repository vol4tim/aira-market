import React from 'react'
import SellConfirm from './sellConfirm'
import Name from '../common/name'
import EthLink from '../../../../shared/components/common/ethLink';

const Main = props => (
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
                {order.type === 'bids' ?
                  <b style={{ color: 'red' }}>sell</b>
                  :
                  <b style={{ color: 'green' }}>buy</b>
                }
              </td>
              <td>{order.price} Air</td>
              <td>
                <ul>
                  {order.beneficiary.map((address, index2) =>
                    <li key={index2}>
                      <EthLink small address={address} />
                    </li>
                  )}
                </ul>
              </td>
              <td>
                <ul>
                  {order.promisee.map((address, index2) =>
                    <li key={index2}>
                      <EthLink small address={address} />
                    </li>
                  )}
                </ul>
              </td>
              <td>
                <ul>
                  {order.promisee.map((address, index2) =>
                    <li key={index2}>
                      <Name names={props.names} address={address} />
                    </li>
                  )}
                </ul>
              </td>
              <td>
                <EthLink small address={order.promisor} />
              </td>
              <td>
                {order.type === 'asks' ?
                  <SellConfirm
                    market={props.market}
                    id={order.id}
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

export default Main
