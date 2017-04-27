import React from 'react'
import _ from 'lodash'

const Name = (props) => {
  let element = <span />;
  if (_.has(props.names, props.address)) {
    element = <span>{props.names[props.address]}</span>
  } else if (_.isString(props.name) && props.name.substr(0, 2) === 'Qm') {
    element = <a href={'https://ipfs.io/ipfs/' + props.name} target="_blank">view</a>
  } else if (_.isString(props.name)) {
    element = <span>{props.name}</span>
  }
  return element
}

export default Name
