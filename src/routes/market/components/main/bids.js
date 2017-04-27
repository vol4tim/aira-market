import React from 'react'
import Name from './name'

const Bids = props => (
  (<div className="panel panel-default">
    <div className="panel-body">
      <table className="table table-hover">
        <thead>
          <tr>
            <th>price</th>
            <th>beneficiary</th>
            <th>promisee</th>
            <th>name</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {props.orders.map((order, index) =>
            <tr key={index}>
              <td><span className="price">{order.price}</span></td>
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
                {props.approve >= order.price ?
                  <button className="btn btn-default btn-xs" onClick={() => props.onBuy(props.market, order.index)}>
                    <span className="fa fa-chevron-down" />
                  </button>
                  :
                  <p>Not enough approve</p>
                }
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>)
)

export default Bids
