import { client } from 'graphql/client'
import { SONGS_QUERY } from 'graphql/queries/songs'

export default {
  fetchResult: (ctx, e) => {
    return new Promise((reslove, reject) => {
      client.query({
        query: SONGS_QUERY,
        // Note 1. If user input keyword via voice search,
        //         it will create extra white space in the end.
        // Note 2. The API doesn't need white space to implement fuzzy matching.
        variables: ctx.variables,
        fetchPolicy: e.retry ? 'network-only' : 'cache-first'
      }).then(res => {
        // For demo error handle
        // if (Math.round(Math.random() * 10) <= 5) reject(res.errors)
        if (res.errors) reject(res.errors)
        reslove(res.data)
      })
    })
  }
}
