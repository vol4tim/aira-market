import React from 'react'
import _ from 'lodash'

const EthLink = (props) => {
  let label = props.address
  if (props.small) {
    label = <small>{label}</small>
  }
  if (!_.isEmpty(props.label)) {
    label = <span className={'label label-' + props.label}>{label}</span>
  }
  let type = 'address'
  if (!_.isEmpty(props.type)) {
    type = props.type
  }
  return <a href={'https://kovan.etherscan.io/' + type + '/' + props.address} target="_blank">{label}</a>
}

export default EthLink
