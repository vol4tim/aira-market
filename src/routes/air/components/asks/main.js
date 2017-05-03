import React from 'react'

const Main = props => (
  (<div className="panel panel-default">
    <div className="panel-body">
      <table className="table table-hover">
        <thead>
          <tr>
            <th>price</th>
            <th>value</th>
          </tr>
        </thead>
        <tbody>
          {props.orders.map((order, index) =>
            <tr key={index}>
              <td>{order.price}</td>
              <td>{order.value}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>)
)

export default Main
