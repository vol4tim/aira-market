import _ from 'lodash'
import { START_LOAD, LOAD_MARKET, LOAD_TOKEN, LOAD_ASKS_ORDERS, LOAD_BIDS_ORDERS } from './actionTypes'
import { MARKET_AIR_ADDR } from '../../config/config'

const initialState = {
  market: MARKET_AIR_ADDR,
  info: {
    name: ''
  },
  isLoad: false,
  isLoadMarket: false,
  isLoadTokenBase: false,
  isLoadTokenQuote: false,
  isLoadAsks: false,
  isLoadBids: false,
  isLoadMy: false,
  orders: [],
  asks: [],
  bids: [],
  tokenBase: {
    address: '',
    balance: 0,
    approve: 0
  },
  tokenQuote: {
    address: '',
    balance: 0,
    approve: 0
  }
}

export default function air(state = initialState, action) {
  switch (action.type) {
    case START_LOAD: {
      if (action.payload === 'token_base') {
        return { ...state, isLoadTokenBase: true }
      } else if (action.payload === 'token_quote') {
        return { ...state, isLoadTokenBase: true }
      } else if (action.payload === 'asks') {
        return { ...state, isLoadAsks: true }
      } else if (action.payload === 'bids') {
        return { ...state, isLoadBids: true }
      } else if (action.payload === 'my') {
        return { ...state, isLoadMy: true }
      } else if (action.payload === 'market') {
        return { ...state, isLoadMarket: true }
      }
      return { ...state, isLoad: true }
    }

    case LOAD_MARKET: {
      return { ...state, info: { ...action.payload }, isLoadMarket: false }
    }

    case LOAD_TOKEN: {
      if (action.payload.type === 'base') {
        return { ...state, tokenBase: { ...action.payload }, isLoadTokenBase: false }
      }
      return { ...state, tokenQuote: { ...action.payload }, isLoadTokenQuote: false }
    }

    case LOAD_ASKS_ORDERS: {
      const asks = _.reduce(action.payload, (result, order) => {
        result.push(order.id);
        return result;
      }, []);
      const orders = _.filter(state.orders, { type: 'bids' });
      return { ...state, orders: [...orders, ...action.payload], asks, isLoadAsks: false }
    }

    case LOAD_BIDS_ORDERS: {
      const bids = _.reduce(action.payload, (result, order) => {
        result.push(order.id);
        return result;
      }, []);
      const orders = _.filter(state.orders, { type: 'asks' });
      return { ...state, orders: [...orders, ...action.payload], bids, isLoadBids: false }
    }

    default:
      return state;
  }
}
