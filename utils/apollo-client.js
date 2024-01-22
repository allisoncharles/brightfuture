import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const uploadLink = new HttpLink({
  uri: `https://brightfutureschools.vercel.app/api/graphql`,
  // uri: `http://localhost:3000/api/graphql`,
  credentials: "same-origin",
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: uploadLink,
});

export default client;
