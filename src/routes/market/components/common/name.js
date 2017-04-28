import React from 'react'
import _ from 'lodash'

const Name = (props) => {
  let element = <span />;
  if (_.has(props.names, props.address)) {
    if (props.names[props.address].substr(0, 2) === 'Qm') {
      element = <a href={'https://ipfs.io/ipfs/' + props.names[props.address]} target="_blank">view</a>
    } else {
      element = <span>{props.names[props.address]}</span>
    }
  }
  return element
}

export default Name
