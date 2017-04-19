import React from 'react'

const Bids = props => (
  (<div className="panel panel-default">
    <div className="panel-body">
      <table className="table table-hover">
        <thead>
          <tr>
            <th>price</th>
            <th>beneficiary</th>
            <th>promisee</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {props.orders.map((order, index) =>
            <tr key={index}>
              <td><span className="price">{order.price}</span></td>
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
