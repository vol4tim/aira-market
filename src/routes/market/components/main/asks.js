import React from 'react'

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
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>)
)

export default Asks
