import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import AppRouter from "./routers/AppRouter";

import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "apollo-link-context";
import { AuthContext } from "./components/AuthContext";
const httpLink = createHttpLink({
  uri: "https://api-gateway-urgencias.herokuapp.com/",
});
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      Authorization: localStorage.getItem("token_access") || "",
    },
  };
});
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <AuthContext>
      <AppRouter />
    </AuthContext>
  </ApolloProvider>,
  document.getElementById("root")
);
