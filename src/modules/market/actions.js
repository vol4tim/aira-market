import Promise from 'bluebird'
import _ from 'lodash'
import cookie from 'react-cookie'
import { START_LOAD, SET_MARKET, LOAD_MARKET, LOAD_TOKEN, LOAD_ASKS_ORDERS, LOAD_BIDS_ORDERS, LOAD_MY_ORDERS } from './actionTypes'
import { getContractByAbiName, blockchain, coinbase, listenAddress } from '../../utils/web3'
import { promiseFor } from '../../utils/helper'
import { TOKEN_ADDR } from '../../config/config'
import { flashMessage } from '../app/actions'
import { addModule } from '../liability/actions'

export function events(marketAddr) {
  return (dispatch) => {
    getContractByAbiName('LiabilityMarket', marketAddr)
      .then((contract) => {
        console.log('events');
        contract.listen('OpenAskOrder', (result) => {
          console.log('OpenAskOrder', result);
          dispatch(flashMessage(
            'OpenAskOrder: ' + Number(result.order)
          ))
        })
        contract.listen('OpenBidOrder', (result) => {
          console.log('OpenBidOrder', result);
          dispatch(flashMessage(
            'OpenBidOrder: ' + Number(result.order)
          ))
        })
        contract.listen('CloseAskOrder', (result) => {
          console.log('CloseAskOrder', result);
          dispatch(flashMessage(
            'CloseAskOrder: ' + Number(result.order)
          ))
        })
        contract.listen('CloseBidOrder', (result) => {
          console.log('CloseBidOrder', result);
          dispatch(flashMessage(
            'CloseBidOrder: ' + Number(result.order)
          ))
        })
        contract.listen('AskOrderCandidates', (result) => {
          console.log('AskOrderCandidates', result);
          dispatch(flashMessage(
            'AskOrderCandidates: ' + Number(result.order) + ' ' + result.beneficiary + ' ' + result.promisee
          ))
        })
        contract.listen('NewLiability', (result) => {
          console.log('NewLiability', result);
          dispatch(addModule(result.liability))
        })
      })
  }
}

export function setMarket(address) {
  return (dispatch) => {
    cookie.save('market_address', address);
    dispatch({
      type: SET_MARKET,
      payload: address
    });
    dispatch(events(address));
  }
}

export function loadMarket(marketAddr) {
  return (dispatch) => {
    dispatch({
      type: START_LOAD,
      payload: 'market'
    })
    let market;
    getContractByAbiName('LiabilityMarket', marketAddr)
      .then((contract) => {
        market = contract;
        return market.call('name')
      })
      .then((name) => {
        dispatch({
          type: LOAD_MARKET,
          payload: {
            name
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
    getContractByAbiName('LiabilityMarket', marketAddr)
      .then((contract) => {
        market = contract;
        return market.call('asksLength')
      })
      .then((length) => {
        const orders = [];
        const getOrder = (i) => {
          const res = {
            indexOrder: 0,
            priceOrder: 0
          };
          return market.call('asks', [i])
            .then((index) => {
              res.indexOrder = Number(index)
              // console.log('index', res.indexOrder);
              return market.call('priceOf', [res.indexOrder])
            })
            .then((priceOrder) => {
              res.priceOrder = Number(priceOrder);
              // console.log('price', Number(price));
              return market.call('getOrder', [res.indexOrder])
            })
            .then((order) => {
              // console.log('order', order);
              if (res.indexOrder > 0 && !order[3]) {
                return {
                  index: res.indexOrder,
                  beneficiary: order[0],
                  promisee: order[1],
                  promisor: order[2],
                  closed: order[3],
                  price: res.priceOrder
                }
              }
              return false;
            })
        }
        for (let i = 0; i < Number(length) && i <= 14; i += 1) {
          orders.push(getOrder(i));
        }
        return Promise.all(orders)
      })
      .then((asks) => {
        // console.log('ok', asks);
        dispatch({
          type: LOAD_ASKS_ORDERS,
          payload: {
            asks: _.reverse(_.sortBy(asks, ['price']))
          }
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
    getContractByAbiName('LiabilityMarket', marketAddr)
      .then((contract) => {
        market = contract;
        return market.call('bidsLength')
      })
      .then((length) => {
        const orders = [];
        const getOrder = (i) => {
          const res = {
            indexOrder: 0,
            priceOrder: 0
          };
          return market.call('bids', [i])
            .then((index) => {
              res.indexOrder = Number(index)
              // console.log('index', res.indexOrder);
              return market.call('priceOf', [res.indexOrder])
            })
            .then((priceOrder) => {
              res.priceOrder = Number(priceOrder);
              // console.log('price', Number(price));
              return market.call('getOrder', [res.indexOrder])
            })
            .then((order) => {
              // console.log('order', order);
              if (res.indexOrder > 0 && !order[3]) {
                return {
                  index: res.indexOrder,
                  beneficiary: order[0],
                  promisee: order[1],
                  promisor: order[2],
                  closed: order[3],
                  price: res.priceOrder
                }
              }
              return false;
            })
        }
        for (let i = 0; i < Number(length) && i <= 14; i += 1) {
          orders.push(getOrder(i));
        }
        return Promise.all(orders)
      })
      .then((bids) => {
        // console.log('ok', bids);
        dispatch({
          type: LOAD_BIDS_ORDERS,
          payload: {
            bids: _.sortBy(bids, ['price'])
          }
        })
      })
  }
}

export function loadMyOrders(marketAddr) {
  return (dispatch) => {
    dispatch({
      type: START_LOAD,
      payload: 'my'
    })
    const indexes = [];
    let market;
    let id = 0;
    getContractByAbiName('LiabilityMarket', marketAddr)
      .then((contract) => {
        market = contract;
        return market.call('ordersOf', [coinbase(), id])
      })
      .then(firstIndex => (
        promiseFor(index => index > 0, (index) => {
          indexes.push(Number(index))
          // console.log('index', Number(index));
          id += 1;
          return market.call('ordersOf', [coinbase(), id])
        }, Number(firstIndex))
      ))
      .then(() => {
        const orders = [];
        const getOrder = (index) => {
          const res = {
            indexOrder: index,
            priceOrder: 0
          };
          return market.call('priceOf', [res.indexOrder])
            .then((priceOrder) => {
              res.priceOrder = Number(priceOrder);
              // console.log('price', Number(price));
              return market.call('getOrder', [res.indexOrder])
            })
            .then((order) => {
              // console.log('order', order);
              if (res.indexOrder > 0 && !order[3]) {
                return {
                  index: res.indexOrder,
                  type: (order[2] === '0x0000000000000000000000000000000000000000') ? 'sell' : 'buy',
                  beneficiary: order[0],
                  promisee: order[1],
                  promisor: order[2],
                  closed: order[3],
                  price: res.priceOrder
                }
              }
              return false;
            })
        }
        _.forEach(indexes, (i) => {
          orders.push(getOrder(i));
        })
        return Promise.all(orders)
      })
      .then((orders) => {
        // console.log('my oks', _.compact(orders));
        dispatch({
          type: LOAD_MY_ORDERS,
          payload: {
            myOrders: _.compact(orders)
          }
        })
      })
  }
}

export function loadToken(marketAddr) {
  return (dispatch) => {
    dispatch({
      type: START_LOAD,
      payload: 'token'
    })
    getContractByAbiName('Token', TOKEN_ADDR)
      .then(contract => (
        Promise.join(
          contract.call('balanceOf', [coinbase()]),
          contract.call('allowance', [coinbase(), marketAddr]),
          contract.call('decimals'),
          (balance, allowance, decimalsR) => {
            const decimalsFormat = _.toNumber(decimalsR)
            let decimals = decimalsFormat
            if (decimals > 0) {
              decimals = Math.pow(10, decimals)
            } else {
              decimals = 1
            }
            return {
              address: TOKEN_ADDR,
              balance: (_.toNumber(balance) / decimals).toFixed(decimalsFormat),
              approve: (_.toNumber(allowance) / decimals).toFixed(decimalsFormat)
            }
          }
        )
      ))
      .then((token) => {
        dispatch({
          type: LOAD_TOKEN,
          payload: token
        })
        listenAddress(TOKEN_ADDR, 'loadToken', () => {
          dispatch(loadToken(marketAddr))
        })
        listenAddress(marketAddr, 'loadMarket', () => {
          dispatch(loadToken(marketAddr))
          dispatch(loadAsks(marketAddr));
          dispatch(loadBids(marketAddr));
          dispatch(loadMyOrders(marketAddr));
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
    dispatch(send('LiabilityMarket', marketAddr, 'limitBuy', _.values(data)))
  }
}

export function onBuy(marketAddr, index) {
  return (dispatch) => {
    dispatch(send('LiabilityMarket', marketAddr, 'buyAt', [index]))
  }
}

export function onSell(marketAddr, index, data) {
  return (dispatch) => {
    dispatch(send('LiabilityMarket', marketAddr, 'sellAt', [index, data.promisee]))
  }
}

export function onSellConfirm(marketAddr, index, data) {
  return (dispatch) => {
    dispatch(send('LiabilityMarket', marketAddr, 'sellConfirm', [index, data.candidates]))
  }
}

export function approve(marketAddr, address, data) {
  return (dispatch) => {
    const dataForm = _.values(data);
    dataForm.unshift(marketAddr);
    dispatch(send('Token', address, 'approve', dataForm))
  }
}
