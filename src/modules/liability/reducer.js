import _ from 'lodash'
import { START_LOAD, START_LOAD_MODULE, LOAD_MODULE, LOAD_MODULES, ADD_MODULE, ADD_LOG } from './actionTypes'

const initialState = {
  isLoad: false,
  items: []
}

export default function liability(state = initialState, action) {
  switch (action.type) {
    case START_LOAD: {
      return { ...state, isLoad: false }
    }

    case START_LOAD_MODULE: {
      const module = _.find(state.items, ['address', action.payload])
      let items
      if (module) {
        items = state.items.map((item) => {
          if (item.address === action.payload) {
            return {
              ...item,
              isLoad: false
            }
          }
          return item
        })
      } else {
        items = [
          ...state.items,
          action.payload
        ]
      }
      return { ...state, items }
    }

    case LOAD_MODULE: {
      const module = _.find(state.items, ['address', action.payload.address])
      let items
      if (module) {
        items = state.items.map((item) => {
          if (item.address === action.payload.address) {
            return {
              ...item,
              ...action.payload
            }
          }
          return item
        })
      } else {
        items = [
          ...state.items,
          action.payload
        ]
      }
      return { ...state, items }
    }

    case ADD_LOG: {
      const module = _.find(state.items, ['address', action.payload.address])
      let items
      if (module) {
        items = state.items.map((item) => {
          if (item.address === action.payload.address) {
            return {
              ...item,
              logs: [...item.logs, action.payload.event]
            }
          }
          return item
        })
      }
      return { ...state, items }
    }

    case LOAD_MODULES: {
      return { ...state, items: action.payload, isLoad: true }
    }

    case ADD_MODULE: {
      return { ...state, items: [...state.items, action.payload] }
    }

    default:
      return state;
  }
}
