import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from "@apollo/client";
import App from "./App.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import SavedShipWrecks from "./pages/SavedShipWrecks.jsx";
import MapPage from "./pages/MapPage.jsx"; // Import the MapPage component
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: "/graphql",
});

// passes context and sets token to local storage
// returns header with auth token
const authLink = setContext((_, {headers}) => {
  const token = localStorage.getItem('id_token');
  // console.log("authlink:", token )
  return {
      headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : "",
      }
  };
});


// create new apollo client instance
const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ApolloProvider client={client}>
        <LandingPage />
      </ApolloProvider>
    ),
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
      {
        path: "/map",
        element: (
          <ApolloProvider client={client}>
            <MapPage />
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