import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";

import App from "./App.jsx";
import SearchShipWrecks from "./pages/SearchShipWrecks";
import SavedShipWrecks from "./pages/SavedShipWrecks";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage.jsx";
import { setContext } from "@apollo/client/link/context";

// Set up Apollo Client
const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({}),
});

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ApolloProvider client={client}>
        <LandingPage />
      </ApolloProvider>
    ),
    errorElement: <h1 className="display-2">Wrong page!</h1>,
    children: [
      {
        index: true,
        element: (
          <ApolloProvider client={client}>
            <App />
          </ApolloProvider>
        ),
      },
      {
        path: "/saved",
        element: (
          <ApolloProvider client={client}>
            <SavedShipWrecks />
          </ApolloProvider>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <RouterProvider router={router} />
  </ApolloProvider>
);
