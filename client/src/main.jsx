import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ApolloProvider } from "@apollo/client";
import App from "./App.jsx";
import SavedShipWrecks from "./pages/SavedShipWrecks";
import LandingPage from "./pages/LandingPage.jsx";
import client  from './apollSetup.jsx'

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



