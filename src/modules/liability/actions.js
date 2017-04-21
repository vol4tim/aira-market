import Promise from 'bluebird'
import _ from 'lodash'
import cookie from 'react-cookie'
import bs58 from 'bs58'
import { START_LOAD, START_LOAD_MODULE, LOAD_MODULE, LOAD_MODULES, ADD_MODULE, ADD_LOG } from './actionTypes'
import { getContractByAbiName, getLogs, coinbase } from '../../utils/web3'
import { flashMessage } from '../app/actions'

export function log(address) {
  return (dispatch) => {
    getLogs({
      address,
      fromBlock: 0,
      toBlock: 'latest'
    }, (result) => {
      if (result.topics[0] === '0x9782e43d253523a5acb8e376e2c5bb5abbf46a1f032d929e135c93f5b4d8f0dd') { // Result
        dispatch({
          type: ADD_LOG,
          payload: {
            address,
            event: {
              name: 'Result',
              result: {
                hash: bs58.encode(new Buffer('1220' + result.topics[1].replace('0x', ''), 'hex'))
              }
            }
          }
        })
      }
    })
  }
}

export function addModule(address) {
  return (dispatch) => {
    let modules = cookie.load('liability_modules');
    if (_.findIndex(modules, address) < 0) {
      getContractByAbiName('Liability', address)
        .then(contract => (
          Promise.join(
            contract.call('promisor'),
            contract.call('promisee'),
            (promisor, promisee) => (
              {
                promisor,
                promisee
              }
            )
          )
        ))
        .then((module) => {
          if (module.promisor === coinbase()) {
            dispatch(flashMessage('NewLiability: <a target="_blank" href="https://kovan.etherscan.io/address/' + address + '"><strong>' + address + '</strong></a>'))
            if (_.isUndefined(modules)) {
              modules = [];
            }
            modules.push(address);
            cookie.save('liability_modules', modules);
            dispatch({
              type: ADD_MODULE,
              payload: {
                isLoad: false,
                address,
                logs: []
              }
            })
          }
        })
    }
  }
}

export function loadModule(address) {
  return (dispatch) => {
    dispatch({
      type: START_LOAD_MODULE,
      payload: address
    })
    getContractByAbiName('Liability', address)
      .then(contract => (
        Promise.join(
          contract.call('promisor'),
          contract.call('promisee'),
          (promisor, promisee) => (
            {
              address,
              promisor,
              promisee
            }
          )
        )
      ))
      .then((module) => {
        dispatch({
          type: LOAD_MODULE,
          payload: {
            ...module,
            isLoad: true,
            logs: []
          }
        })
        dispatch(log(address))
      })
  }
}

export function loadModules() {
  return (dispatch) => {
    dispatch({
      type: START_LOAD
    })
    const modules = cookie.load('liability_modules');
    if (_.isUndefined(modules)) {
      dispatch({
        type: LOAD_MODULES,
        payload: []
      })
    } else {
      dispatch({
        type: LOAD_MODULES,
        payload: _.map(modules, address => (
          {
            isLoad: false,
            address,
            logs: []
          }
        ))
      })
    }
  }
}

export function refrash(address) {
  return (dispatch) => {
    dispatch({
      type: LOAD_MODULES,
      payload: []
    })
    cookie.save('liability_modules', []);
    getLogs({
      address,
      fromBlock: 0,
      toBlock: 'latest'
    }, (result) => {
      if (result.topics[0] === '0xf0f0e2354315aae25080baa26761b4ef52d621c91208fb0edde9e3f3fade3219') {
        dispatch(addModule('0x' + result.topics[1].substr(result.topics[1].length - 40)))
      }
    })
  }
}
