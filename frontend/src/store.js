import { createStore, combineReducers } from 'redux'
import {} from './reducers'

const reducer = combineReducers({})

// initial store
const initialState = {
  count: 0,
}
// reducer

function reducer(state, action) {
  console.log({ state, action })
  return state
}

const store = createStore(reducer, initialState)

export default store
