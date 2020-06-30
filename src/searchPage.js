import React from 'react'
import Main from 'components/main'
import SearchPageProvider from './context/searchPage'
import { ApolloProvider } from '@apollo/react-hooks'
import { client } from 'graphql/client'

export default () => (
  <ApolloProvider client={client}>
    <SearchPageProvider>
      <Main />
    </SearchPageProvider>
  </ApolloProvider>
)
