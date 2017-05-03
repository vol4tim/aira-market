import Promise from 'bluebird'
import _ from 'lodash'
// import axios from 'axios'
import cookie from 'react-cookie'
import { START_LOAD, SET_MARKET, LOAD_MARKET, LOAD_TOKEN, LOAD_ASKS_ORDERS, LOAD_BIDS_ORDERS/* , SET_NAME_PROMISEE*/ } from './actionTypes'
import { getContractByAbiName, blockchain, coinbase, listenAddress } from '../../utils/web3'
import { formatDecimals } from '../../utils/helper'
import { flashMessage } from '../app/actions'

const getOrder = (market, type, index, decimals) => {
  const orderInfo = {
    type,
    ens: [],
  };
  return market.call(type, [index])
    .then((id) => {
      // if (Number(id) > 0) {
      orderInfo.id = Number(id)
      return market.call('orders', [orderInfo.id])
      // }
      // return false;
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

// export function events(marketAddr) {
//   return (dispatch) => {
//     getContractByAbiName('Market', marketAddr)
//       .then((contract) => {
//         console.log('events');
//         contract.listen('OpenAskOrder', (result) => {
//           console.log('OpenAskOrder', result);
//           dispatch(flashMessage(
//             'OpenAskOrder: ' + Number(result.order)
//           ))
//         })
//         contract.listen('OpenBidOrder', (result) => {
//           console.log('OpenBidOrder', result);
//           dispatch(flashMessage(
//             'OpenBidOrder: ' + Number(result.order)
//           ))
//         })
//         contract.listen('CloseAskOrder', (result) => {
//           console.log('CloseAskOrder', result);
//           dispatch(flashMessage(
//             'CloseAskOrder: ' + Number(result.order)
//           ))
//         })
//         contract.listen('CloseBidOrder', (result) => {
//           console.log('CloseBidOrder', result);
//           dispatch(flashMessage(
//             'CloseBidOrder: ' + Number(result.order)
//           ))
//         })
//         contract.listen('AskOrderCandidates', (result) => {
//           console.log('AskOrderCandidates', result);
//           dispatch(flashMessage(
//             'AskOrderCandidates: ' + Number(result.order) + ' ' + result.ben
// eficiary + ' ' + result.promisee
//           ))
//         })
//         contract.listen('NewLiability', (result) => {
//           console.log('NewLiability', result);
//           dispatch(addModule(result.liability))
//         })
//       })
//   }
// }

export function setMarket(address) {
  return (dispatch) => {
    cookie.save('market_address', address);
    dispatch({
      type: SET_MARKET,
      payload: address
    });
    // dispatch(events(address));
  }
}

export function loadMarket(marketAddr) {
  return (dispatch) => {
    dispatch({
      type: START_LOAD,
      payload: 'market'
    })
    // let market;
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
          (balance, allowance, decimals) => (
            {
              address: tokenAddr,
              balance: formatDecimals(balance, decimals),
              approve: formatDecimals(allowance, decimals)
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
          dispatch(loadBids(marketAddr));
        })
        listenAddress(marketAddr, 'loadMarket', () => {
          dispatch(loadToken(tokenAddr, type, marketAddr))
          dispatch(loadAsks(marketAddr));
          dispatch(loadBids(marketAddr));
        })
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
    dispatch(send('Market', marketAddr, 'limitBuy', _.values(data)))
  }
}

export function onBuy(marketAddr, index) {
  return (dispatch) => {
    dispatch(send('Market', marketAddr, 'buyAt', [index]))
  }
}

export function onSell(marketAddr, index, data) {
  return (dispatch) => {
    dispatch(send('Market', marketAddr, 'sellAt', [index, data.promisee]))
  }
}

export function onSellConfirm(marketAddr, index, data) {
  return (dispatch) => {
    dispatch(send('Market', marketAddr, 'sellConfirm', [index, data.candidates]))
  }
}

export function approve(marketAddr, address, value) {
  return (dispatch) => {
    const dataForm = [value];
    dataForm.unshift(marketAddr);
    dispatch(send('Token', address, 'approve', dataForm))
  }
}
