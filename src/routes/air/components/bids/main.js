import React from 'react'

const Main = props => (
  (<div className="panel panel-default">
    <div className="panel-heading"><h4 className="panel-title">Buy Air</h4></div>
    <div className="panel-body">
      <table className="table table-hover">
        <thead>
          <tr>
            <th>value</th>
            <th>price</th>
          </tr>
        </thead>
        <tbody>
          {props.orders.map((order, index) =>
            <tr key={index}>
              <td>{order.value} AIR</td>
              <td>{order.price} ETH</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>)
)

export default Main
