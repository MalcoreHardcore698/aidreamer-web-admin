import {
    createStore,
    applyMiddleware,
    compose
} from 'redux'

import thunk from 'redux-thunk'
import { reducers } from './utils/reducers'
import initialState from './initialState'

const env = process.env.NODE_ENV

export default (env === 'production')
    ? createStore(
        reducers,
        initialState,
        applyMiddleware(thunk)
    )
    : createStore(
        reducers,
        initialState,
        compose(
            applyMiddleware(thunk),
            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        )
    )