# Example React/GraphQL Frontend

This is a partner frontend to the GraphQL-Workshop repo [here](https://github.com/developess/GraphQL-Workshop) where you build an Elixir graphql API, but it can be used in its own right as an example Apollo implementation.

**To run the backend from the elixir workshop**, make sure you've checked out the `my-first-complete-api` branch and run the server with the command `mix phx.server`.

**To run this app:**

Ensure you have [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable) installed

Install the dependencies

```
yarn install
```

Start the front-end:

```
yarn start
```

Navigate to `http://localhost:1234` to see the app render the data from your GraphQL API!

Below you'll find a breakdown of how this app was created step by step.

## Creating a basic Apollo GraphQL connection in a react app

These steps assume you have a basic React App set up. If you don't, there are instructions at the bottom of this readme to create one. It also requires yarn (which is an npm alternative, see above).

### Step 1 - Add dependencies

```
yarn add apollo-boost @apollo/react-hooks graphql
```

### Step 2 - Wrap your app in an ApolloProvider

First you'll need to import ApolloClient and ApolloProvider in `index.js`

```js
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
```

Then, create your client, providing the endpoint for your backend graphql server

```js
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
});
```

Finally, wrap your App in a `<ApolloProvider/>` component, passing in the client you just created as a prop called `client`.

Your `index.js` file should now look something like this:

```js
import React from "react";
import { render } from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
});

const App = () => (
  <ApolloProvider client={client}>
    <main>
      <h1>My GraphQL app 🚀</h1>
    </main>
  </ApolloProvider>
);

render(<App />, document.getElementById("app"));
```

### Step 3 - query for some data!

There's more than one way to skin a fish, and there's also plenty of ways to query with Apollo. In this example, I've used a react-apollo hook called `useQuery`, as its new and cool.

Create a new file for your query component - I've called it `Addresses.js` as I'm querying for addresses.

Import `React`, `gql` and `useQuery`.

```js
import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
```

Next, write your graphql query inside gql tags like so:

```js
const GET_ADDRESSES_QUERY = gql`
  query getAllAddresses {
    getAddresses {
      id
      houseNumber
      postcode
    }
  }
`;
```

You can then simply use your query in the `useQuery` hook inside a component, and destructure out the data, loading and error keys. These can then be used to render different views or display the data.

```js
export const Addresses = () => {
  const { loading, error, data } = useQuery(GET_ADDRESSES_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h2>List of addresses</h2>

      <ul>
        {data.getAddresses.map(({ id, postcode, houseNumber }, index) => (
          <li key={index}>
            {houseNumber}, {postcode}
          </li>
        ))}
      </ul>
    </div>
  );
};
```

All that's left to do is import and use the Addresses component in `index.js`

Thats it! Run your app and check it out in the browser, see if you can see your addresses :)

Why not try using the createAddress mutation (and the [`useMutation`](https://www.apollographql.com/docs/react/data/mutations/) hook), in a form to add more addresses?

## Steps to recreate the basic react app

1. Create repo

```
mkdir react-frontend
cd react-frontend
yarn init -y
git init
```

2. Ensure parcel-bundler is installed - `yarn global add parcel-bundler`

3. Add required dependencies

```
yarn add react
yarn add react-dom
yarn add --dev parcel-bundler
```

4. Add `.babelrc` file to tell parcel its a react app:

```
{
  "presets": ["env", "react"]
}
```

5. Create boilerplate files: `index.html`, `index.js`

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Graphql app</title>
  </head>
  <body>
    <div id="app"></div>
    <script src="index.js"></script>
  </body>
</html>
```

```js
import React from "react";
import { render } from "react-dom";

const App = () => (
  <main>
    <h1>My GraphQL app 🚀</h1>
  </main>
);

render(<App />, document.getElementById("app"));
```

6. Add start script to `package.json`

```json
"scripts": {
  "start": "parcel index.html",
},
```

7. Start server `yarn start` and check its working! Should be visible on `localhost:1234`
