import Promise from 'bluebird'
import _ from 'lodash'
import BigNumber from 'bignumber.js'
import { START_LOAD, LOAD_MARKET, LOAD_TOKEN, LOAD_ASKS_ORDERS, LOAD_BIDS_ORDERS } from './actionTypes'
import { getContractByAbiName, blockchain, coinbase, listenAddress, getWeb3, transfer, getBalance } from '../../utils/web3'
import { formatDecimals } from '../../utils/helper'
import { flashMessage } from '../app/actions'

const getOrder = (market, type, index, decimals) => {
  const orderInfo = {
    type,
    ens: [],
  };
  return market.call(type, [index])
    .then((id) => {
      orderInfo.id = Number(id)
      return market.call('orders', [orderInfo.id])
    })
    .then((order) => {
      if (order !== false) {
        orderInfo.kind = Number(order[0]);
        orderInfo.agent = order[1];
        orderInfo.value = Number(order[2]);
        orderInfo.startValue = Number(order[3]);
        orderInfo.stamp = Number(order[4]);
        return market.call('priceOf', [orderInfo.id])
      }
      return false;
    })
    .then((priceOrder) => {
      if (priceOrder) {
        orderInfo.price = formatDecimals(priceOrder, decimals);
      }
    })
    .then((result) => {
      if (result) {
        orderInfo.ens = result;
      }
      if (_.has(orderInfo, 'id')) {
        return orderInfo;
      }
      return false;
    })
}

export function events(marketAddr) {
  return (dispatch) => {
    getContractByAbiName('Market', marketAddr)
      .then((contract) => {
        console.log('events');
        contract.listen('OrderOpened', (result) => {
          console.log('OrderOpened', result);
          dispatch(flashMessage(
            'OrderOpened: id: ' + Number(result.order) + ' agent: ' + result.agent
          ))
        })
        contract.listen('OrderClosed', (result) => {
          console.log('OrderClosed', result);
          dispatch(flashMessage(
            'OrderClosed: id: ' + Number(result.order)
          ))
        })
      })
  }
}

export function loadMarket(marketAddr) {
  return (dispatch) => {
    dispatch({
      type: START_LOAD,
      payload: 'market'
    })
    getContractByAbiName('Market', marketAddr)
      .then(contract => (
        Promise.join(
          contract.call('name'),
          contract.call('base'),
          contract.call('quote'),
          (name, base, quote) => (
            {
              name,
              base,
              quote
            }
          )
        )
      ))
      .then((info) => {
        dispatch({
          type: LOAD_MARKET,
          payload: {
            ...info
          }
        })
        dispatch(events(marketAddr));
      })
  }
}

export function loadAsks(marketAddr) {
  return (dispatch) => {
    dispatch({
      type: START_LOAD,
      payload: 'asks'
    })
    let market;
    let decimals;
    getContractByAbiName('Market', marketAddr)
      .then((contract) => {
        market = contract;
        return market.call('decimals')
      })
      .then((result) => {
        decimals = result;
        return market.call('asksLength')
      })
      .then((length) => {
        const orders = [];
        for (let i = 0; i < Number(length) && i <= 14; i += 1) {
          orders.push(getOrder(market, 'asks', i, decimals));
        }
        return Promise.all(orders)
      })
      .then((asks) => {
        dispatch({
          type: LOAD_ASKS_ORDERS,
          payload: asks
        })
      })
  }
}

export function loadBids(marketAddr) {
  return (dispatch) => {
    dispatch({
      type: START_LOAD,
      payload: 'bids'
    })
    let market;
    let decimals;
    getContractByAbiName('Market', marketAddr)
      .then((contract) => {
        market = contract;
        return market.call('decimals')
      })
      .then((result) => {
        decimals = result;
        return market.call('bidsLength')
      })
      .then((length) => {
        const orders = [];
        for (let i = 0; i < Number(length) && i <= 14; i += 1) {
          orders.push(getOrder(market, 'bids', i, decimals));
        }
        return Promise.all(orders)
      })
      .then((bids) => {
        dispatch({
          type: LOAD_BIDS_ORDERS,
          payload: bids
        })
      })
  }
}

export function loadToken(tokenAddr, type, marketAddr) {
  return (dispatch) => {
    dispatch({
      type: START_LOAD,
      payload: 'token_' + type
    })
    getContractByAbiName('Token', tokenAddr)
      .then(contract => (
        Promise.join(
          contract.call('balanceOf', [coinbase()]),
          contract.call('allowance', [coinbase(), marketAddr]),
          contract.call('decimals'),
          getBalance(coinbase()),
          (balance, allowance, decimals, balanceEth) => (
            {
              address: tokenAddr,
              balance: formatDecimals(balance, decimals),
              approve: formatDecimals(allowance, decimals),
              balanceEth
            }
          )
        )
      ))
      .then((token) => {
        dispatch({
          type: LOAD_TOKEN,
          payload: {
            type,
            ...token
          }
        })
        listenAddress(tokenAddr, 'loadToken', () => {
          dispatch(loadToken(tokenAddr, type, marketAddr));
          // dispatch(loadBids(marketAddr));
        })
        // listenAddress(marketAddr, 'loadMarket', () => {
        //   dispatch(loadToken(tokenAddr, type, marketAddr))
        //   dispatch(loadAsks(marketAddr));
        //   dispatch(loadBids(marketAddr));
        // })
      })
  }
}

export function send(abi, address, action, values) {
  return dispatch => (
    // dispatch(startSubmit(formName));
    getContractByAbiName(abi, address)
      .then(contract => contract.send(action, values))
      .then((txId) => {
        // // console.log('txId: ' + txId);
        dispatch(flashMessage('txId: ' + txId))
        return blockchain.subscribeTx(txId)
      })
      .then((transaction) => {
        // dispatch(stopSubmit(formName))
        // dispatch(reset(formName))
        dispatch(flashMessage('blockNumber: ' + transaction.blockNumber))
        return transaction;
      })
      .catch((e) => {
        console.log(e);
        // dispatch(stopSubmit(formName))
        return Promise.reject();
      })
  )
}

export function buy(marketAddr, data) {
  return (dispatch) => {
    const form = {
      type: 1,
      ...data
    };
    form.price = getWeb3().toWei(Number(form.price));
    dispatch(send('Market', marketAddr, 'orderLimit', _.values(form)))
  }
}

export function sell(marketAddr, data) {
  return (dispatch) => {
    const form = {
      type: 0,
      ...data
    };
    form.price = getWeb3().toWei(Number(form.price));
    dispatch(send('Market', marketAddr, 'orderLimit', _.values(form)))
  }
}

export function orderBuy(marketAddr, data) {
  return (dispatch) => {
    const form = {
      type: 1,
      ...data
    };
    dispatch(send('Market', marketAddr, 'orderMarket', _.values(form)))
  }
}

export function orderSell(marketAddr, data) {
  return (dispatch) => {
    const form = {
      type: 0,
      ...data
    };
    dispatch(send('Market', marketAddr, 'orderMarket', _.values(form)))
  }
}

export function approve(marketAddr, address, value) {
  return (dispatch) => {
    getContractByAbiName('Token', address)
      .then(contract => (
        contract.call('decimals')
      ))
      .then((decimals) => {
        const valueNum = new BigNumber(value)
        const dataForm = [valueNum.shift(decimals).toNumber()];
        dataForm.unshift(marketAddr);
        dispatch(send('Token', address, 'approve', dataForm))
      })
  }
}

export function addBalance(token, value) {
  return (dispatch) => {
    transfer(coinbase(), token, value.value)
      .then((txId) => {
        dispatch(flashMessage('txId: ' + txId))
        return blockchain.subscribeTx(txId)
      })
      .then((transaction) => {
        dispatch(flashMessage('blockNumber: ' + transaction.blockNumber))
        return transaction;
      })
      .catch((e) => {
        console.log(e);
        // dispatch(stopSubmit(formName))
        return Promise.reject();
      })
  }
}
