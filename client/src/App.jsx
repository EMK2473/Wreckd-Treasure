import { Routes, Route } from 'react-router-dom';
import SearchShipWrecks from './pages/SearchShipWrecks';
import SavedShipWrecks from './pages/SavedShipWrecks';
import Navbar from './components/Navbar';
import MapPage from './pages/MapPage'; 

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<SearchShipWrecks />} />
        <Route path="/saved" element={<SavedShipWrecks />} />
        <Route path="/map" element={<MapPage />} /> 
        <Route path="*" element={<h1 className="display-2">Wrong page!</h1>} />
      </Routes>
    </>
  );
}

export default App;