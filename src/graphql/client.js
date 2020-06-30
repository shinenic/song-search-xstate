import ApolloClient from 'apollo-boost'
import { GRAPHQL_PATH } from 'config/index'
import { InMemoryCache } from 'apollo-cache-inmemory'

const cache = new InMemoryCache()

export const client = new ApolloClient({ uri: GRAPHQL_PATH, cache })
