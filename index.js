import React from "react";
import { render } from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

import { Addresses } from "./Addresses.js";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

const App = () => (
  <ApolloProvider client={client}>
    <main>
      <h1>My GraphQL app 🚀</h1>
      <Addresses />
    </main>
  </ApolloProvider>
);

render(<App />, document.getElementById("app"));
