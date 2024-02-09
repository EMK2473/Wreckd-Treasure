import React, { useState, useEffect } from "react";
import { Container, Col, Form, Button, Card, Row } from "react-bootstrap";
import { useMutation, useQuery } from "@apollo/client";
import { SAVE_SHIPWRECK, REMOVE_SHIPWRECK } from "../utils/mutations";
import{ GET_ME } from "../utils/queries"
import Auth from "../utils/auth";
import { removeShipWreckId, getSavedShipWreckIds } from "../utils/localStorage";
// import ShipwreckMap from "./ShipwreckMap";
import shipwrecks from "./ShipWreckData";

const SearchShipWrecks = () => {
  // State for searched shipwrecks
  const [searchedShipWrecks, setSearchedShipWrecks] = useState([]);
  // State for selected shipwreck in search
  const [selectedShipwreck, setSelectedShipwreck] = useState("");
  // State for saved shipwreck IDs
  const [savedShipWreckIds, setSavedShipWreckIds] = useState(getSavedShipWreckIds());

  // Query to get user's saved shipwrecks
  const { loading, data } = useQuery(GET_ME);

  // Effect to update saved shipwreck IDs
  useEffect(() => {
    if (!loading) {
      const userData = data ? data.me : {};
      if (userData && userData.savedShipWrecks) {
        setSavedShipWreckIds(userData.savedShipWrecks.map(shipWreck => shipWreck.shipWreckId));
      }
    }
  }, [data, loading]);

  // Mutation to save a shipwreck
  const [saveShipWreck] = useMutation(SAVE_SHIPWRECK);

  // Mutation to remove a saved shipwreck
  const [removeShipWreck] = useMutation(REMOVE_SHIPWRECK);

  // Function to handle form submission for searching shipwrecks
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!selectedShipwreck) {
      return false;
    }
    try {
      const selectedShipwreckDetails = shipwrecks[selectedShipwreck];
      if (!selectedShipwreckDetails) {
        throw new Error("Shipwreck not found!");
      }
      const shipWreckData = [
        {
          ...selectedShipwreckDetails,
          coordinates: `${selectedShipwreckDetails.coordinates.lat},${selectedShipwreckDetails.coordinates.lng}`, // Convert coordinates object to string
          description: `Coordinates: ${selectedShipwreckDetails.coordinates.lat},${selectedShipwreckDetails.coordinates.lng}\nYear Sunk: ${selectedShipwreckDetails.yearSunk}\nCasualties: ${selectedShipwreckDetails.casualties}\nCountry: ${selectedShipwreckDetails.country}`,
          image: selectedShipwreckDetails.image || "",
        },
      ];
      
      setSearchedShipWrecks(shipWreckData);
      setSelectedShipwreck("");
    } catch (err) {
      console.error(err);
    }
  };

  // Function to save a shipwreck
  const handleSaveShipWreck = async (shipWreckId) => {
    const shipWreckToSave = searchedShipWrecks.find(shipWreck => shipWreck.shipWreckId === shipWreckId);
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      setSavedShipWreckIds(prevSavedShipWreckIds => [...prevSavedShipWreckIds, shipWreckToSave.shipWreckId]);
      await saveShipWreck({ variables: { newShipWreck: shipWreckToSave } });
    } catch (err) {
      console.error("Save ShipWreck Mutation Error:", err);
    }
  };

  // Function to remove a saved shipwreck
  const handleDeleteShipWreck = async (shipWreckId) => {
    try {
      await removeShipWreck({ variables: { shipWreckId } });
      removeShipWreckId(shipWreckId);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="fixed top-0 left-0 right-0 bg-gray-800 text-white py-10 px-5 text-center" style={{ marginTop: '200px' }}>
        <h1 className="text-3xl mb-5 border-white" style={{ border: "5px solid", borderRight: "5px solid" }}>
          Shipwreck Explorer
        </h1>
        <div className="container mx-auto mt-0">
          <form onSubmit={handleFormSubmit}>
            <div className="flex justify-center items-start">
              <select
                value={selectedShipwreck}
                onChange={(e) => setSelectedShipwreck(e.target.value)}
                className="block px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mr-2"
                style={{ marginRight: "50px" }}
              >
                <option value="" disabled>
                  Select Shipwreck
                </option>
                {shipwrecks.map((shipwreck, index) => (
                  <option key={index} value={index}>
                    {shipwreck.name}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="inline-block px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gold-500"
              >
                Plunder
              </button>
            </div>
          </form>
        </div>
      </div>
  
      {/* Shipwreck cards container */}
      <div className="container mx-auto mt-24">
        <div className="flex justify-center">
          <div className="w-full md:w-1/2">
            <div className="container mx-auto">
              <h3 className="p-2 text-white border bg-black mt-3">
                {searchedShipWrecks.length
                  ? `Viewing ${searchedShipWrecks.length} results:`
                  : "Plunder for a shipwreck to begin"}
              </h3>
              <div className="mt-3 flex flex-wrap">
                {searchedShipWrecks.map((shipWreck, index) => (
                  <div key={index} className="w-full md:w-1/4 mb-4">
                    <div className="border border-gray-300 rounded-lg overflow-hidden bg-white" style={{ width: '100%', height: '100%' }}>
                      {shipWreck.image && (
                        <img
                          src={shipWreck.image}
                          alt={`The cover for ${shipWreck.title}`}
                          className="w-full h-40 object-cover" // Fixed height for image
                          style={{ width: '100%', height: '200px' }} // Fixed size for image
                        />
                      )}
                      <div className="p-4">
                        <h2 className="text-xl font-semibold">{shipWreck.name}</h2>
                        <p>
                          <strong>Rarity: </strong> {shipWreck.rarity}
                          <br />
                          <strong>Treasure: </strong> <br />
                          <span className="text-2xl">{shipWreck.treasure}</span>
                          <br />
                          <strong>Reason for Sinking:</strong> {shipWreck.reasonForSinking}
                          <br />
                          <strong>Year Sunk:</strong> {shipWreck.yearSunk}
                          <br />
                          <strong>Country:</strong> {shipWreck.country}
                          <br />
                          <strong>Body of Water:</strong> {shipWreck.bodyOfWater}
                          <br />
                          <strong>Casualties:</strong> {shipWreck.casualties}
                          <br />
                          <strong>Coordinates:</strong> {shipWreck.coordinates.lat}, {shipWreck.coordinates.lng}
                        </p>
                        {Auth.loggedIn() && (
                          <button
                            disabled={savedShipWreckIds?.some(id => id === shipWreck.shipWreckId)}
                            className="block w-full mt-3 bg-black text-white font-bold py-2 px-4 rounded" // Changed background to black and text to white
                            onClick={() => handleSaveShipWreck(shipWreck.shipWreckId)}
                          >
                            {savedShipWreckIds?.some(id => id === shipWreck.shipWreckId)
                              ? "Expedition Booked!"
                              : "Book Expedition!"}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
  
{/* Saved Expeditions section */}
<div className="container mx-auto mt-24">
  <div className="flex justify-center">
    <div className="w-full">
      <div className="container mx-auto">
        <h2 className="text-white text-center text-3xl mb-5 border-white" style={{ border: "5px solid", borderRight: "5px solid" }}>
          Saved Expeditions
        </h2>
        <div className="mt-3 flex flex-wrap justify-center"> {/* Ensure the container is flex and justify-center */}
          {data &&
            data.me &&
            data.me.savedShipWrecks.map((shipWreck) => (
              <div key={shipWreck.shipWreckId} className="w-1/2 md:w-1/4 lg:w-1/6 mb-4 flex-none" style={{width: '75%'}}> {/* Adjust the width style here */}
                <div className="border border-gray-300 rounded-lg overflow-hidden bg-white" style={{ width: '100%', height: '100%' }}>
                  {shipWreck.image && (
                    <img
                      src={shipWreck.image}
                      alt={`The cover for ${shipWreck.title}`}
                      className="w-1/2 h-40 object-cover" // Reduced width to half and fixed height
                      style={{ width: '100%', height: '200px' }} // Fixed size for image
                    />
                  )}
                  <div className="p-4">
                    <h2 className="text-xl font-semibold">{shipWreck.name}</h2>
                    <p className="text-sm">Body of Water: {shipWreck.bodyOfWater}</p>
                    <strong>Treasure: </strong> <br />
                    <span className="text-2xl">{shipWreck.treasure}</span>
                    <br />
                    <br />
                    {/* <p>{shipWreck.chair ? shipWreck.chair : "No Chair"}</p> */}
                    <button
                      className="block w-full bg-black hover:bg-black text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleDeleteShipWreck(shipWreck.shipWreckId)}
                    >
                      Delete this Expedition
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  </div>
</div>



    </div>
  );
  
}
export default SearchShipWrecks;