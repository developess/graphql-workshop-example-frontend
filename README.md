# Example GraphQL Frontend

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
yarn add apollo-boost
yarn add @apollo/react-hooks
yarn add graphql
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
    <title>React starter app</title>
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

7. Start server and check its working! Should be visible on `localhost:1234`
