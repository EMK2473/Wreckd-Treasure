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
import LandingPage from "./pages/LandingPage.jsx";
import { setContext } from "@apollo/client/link/context";

// set graphql api endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

// passes context and sets token to local storage
// returns header with auth token
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  // console.log("authlink:", token )
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
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
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <RouterProvider router={router} />
  </ApolloProvider>
);
