// App.jsx
import { Routes, Route } from "react-router-dom";
import SearchShipWrecks from "./pages/SearchShipWrecks";
import SavedShipWrecks from "./pages/SavedShipWrecks";
import Navbar from "./components/Navbar";
import MapDisplay from "./components/MapDisplay"; 

function App() {
  return (
    <>
      <Navbar />
      <MapDisplay />
      <Routes>
        <Route path="/" element={<SearchShipWrecks />} />
        <Route path="/saved" element={<SavedShipWrecks />} />
        <Route path="*" element={<h1 className="display-2">Wrong page!</h1>} />
      </Routes>
    </>
  );
}

export default App;
