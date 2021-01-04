import { InMemoryCache } from "apollo-boost";
import ApolloClient from "apollo-client";
import { WebSocketLink } from "apollo-link-ws";

const headers = {
  "x-hasura-admin-secret": "reactagram",
};

const client = new ApolloClient({
  link: new WebSocketLink({
    uri: "wss://reactagram.hasura.app/v1/graphql",
    options: {
      reconnect: true,
      connectionParams: {
        headers,
      },
    },
  }),
  cache: new InMemoryCache(),
});

export default client;
