import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import MapDisplay from "./components/MapDisplay"; // Import the new MapDisplay component
import  client  from './apollSetup.jsx'
import SearchShipWrecks from "./pages/SearchShipWrecks";
import SavedShipWrecks from "./pages/SavedShipWrecks";
import Navbar from "./components/Navbar";

function App() {
  return (
    <ApolloProvider client={client}>
      <>
        {/* Display Navbar component */}
        <Navbar />

        {/* Display MapDisplay component */}
        <MapDisplay />

        {/* Display the content based on the route */}
        <Routes>
          <Route path="*" element={<SearchShipWrecks />} />
          <Route path="/saved" element={<SavedShipWrecks />} />
          <Route
            path="*"
            element={<h1 className="display-2">Wrong page!</h1>}
          />
        </Routes>
      </>
    </ApolloProvider>
  );
}

export default App;
