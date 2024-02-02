import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import App from "./App.jsx";
import SearchShipWrecks from "./pages/SearchShipWrecks.jsx";
import SavedShipWrecks from "./pages/SavedShipWrecks.jsx";
import MapDisplay from "./components/MapDisplay"; 

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1 className="display-2">Wrong page!</h1>,
    children: [
      {
        index: true,
        element: <SearchShipWrecks />,
      },
      {
        path: "/saved",
        element: <SavedShipWrecks />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
