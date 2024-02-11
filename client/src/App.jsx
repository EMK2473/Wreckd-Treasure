import { Routes, Route } from "react-router-dom";
import SearchShipWrecks from "./pages/SearchShipWrecks";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<SearchShipWrecks />} />
        <Route path="*" element={<h1 className="display-2">Wrong page!</h1>} />
      </Routes>
    </>
  );
}

export default App;
