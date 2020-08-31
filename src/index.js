import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from '@apollo/react-hooks'
import { split } from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/client/link/ws'
import { createUploadLink } from 'apollo-upload-client'
import * as serviceWorker from './serviceWorker'
import storeFactory from './storeFactory'
import App from './components/App'
import { config } from './utils/config'
import './index.css'

const api = config.get('api')
const apiWs = config.get('apiWs')

const wsLink = new WebSocketLink({
  uri: `${apiWs}/graphql`,
  options: {
    reconnect: true
  }
})

const uploadLink = createUploadLink({
  uri: `${api}/graphql`
})

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  uploadLink
)

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache()
})

const store = storeFactory

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
)

serviceWorker.unregister()