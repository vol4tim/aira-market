import React from 'react'
import _ from 'lodash'

const Name = (props) => {
  let element;
  if (_.has(props.names, props.address)) {
    element = <span>{props.names[props.address]}</span>
  } else if (props.hash.substr(0, 2) === 'Qm') {
    element = <a href={'https://ipfs.io/ipfs/' + props.hash} target="_blank">view</a>
  } else {
    element = <span>{props.hash}</span>
  }
  return element
}

export default Name
