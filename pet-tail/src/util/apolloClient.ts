import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { HttpLink } from '@apollo/client';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: `${process.env.REACT_APP_FETCH_URL}graphql`,
})

const client = new ApolloClient({
  cache, 
  link
})

// const client = new ApolloClient({
//   uri: `${process.env.REACT_APP_FETCH_URL}/graphql`,
//   cache: new InMemoryCache()
// })

export { client };