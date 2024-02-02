import React, { useState, useEffect } from "react";
import { Container, Col, Form, Button, Card, Row } from "react-bootstrap";

import Auth from "../utils/auth";
import { useMutation } from "@apollo/client";
import { SAVE_SHIPWRECK } from "../utils/mutations";

const shipwrecks = [
  { name: "Empress of Ireland", image: '/ShipWreckPictures/EmpressOfIreland1.png', reasonForSinking: "Collision", yearSunk: "1914", country: "United Kingdom", bodyOfWater: "Gulf of Saint Lawrence", casualties: "1012", coordinates: "48°37.5′N 68°24.5′W"},

  { name: "Gunilda", image: "/ShipWreckPictures/Gunilda1.png", reasonForSinking: "Ran aground and sank", yearSunk: "1911", country: "United States", bodyOfWater: "Lake Superior", casualties: "0", coordinates: "48° 47′ 3″ N, 87° 25′ 20″ W"},

  { name: "HMHS Britannic", image: "/ShipWreckPictures/HMHSBritannic1.png", reasonForSinking: "War/battle damage", yearSunk: "1916", country: "United Kingdom", bodyOfWater: "Aegean Sea", casualties: "30", coordinates: "37° 42′ 5″ N, 24° 17′ 2″ E"},

  { name: "The Zeila Shipwreck", image: "/ShipWreckPictures/Zeila1.png", reasonForSinking: "Collision", yearSunk: "2008", country: "Namibia", bodyOfWater: "Atlantic Ocean", casualties: "N/A", coordinates: "-22.24024396889257, 14.353560089858977"},

  { name: "SS Daniel J. Morrell", image: "/ShipWreckPictures/DanielJMorrell1.png", reasonForSinking: "Weather", yearSunk: "1966", country: "United States", bodyOfWater: "Lake Huron", casualties: "28", coordinates: "44°15.9N 82°50W"},

  { name: "Vasa", image: "/ShipWreckPictures/Vasa1.png", reasonForSinking: "Flawed Design", yearSunk: "1628", country: "Sweden", bodyOfWater: "Stockholm Harbor", casualties: "15", coordinates: "59°19′40″N 18°05′28″E"},

  { name: "USS Indianapolis", image: "/ShipWreckPictures/USSIndianapolis1.png", reasonForSinking: "War/battle damage", yearSunk: "1945", country: "United States", bodyOfWater: "Philippine Sea", casualties: "879", coordinates: "12°2′N 134°48′E"},

  { name: "Mary Rose", image: "/ShipWreckPictures/MaryRose1.png", reasonForSinking: "War/battle damage", yearSunk: "1545", country: "United Kingdom", bodyOfWater: "The Solent", casualties: "179", coordinates: "50°47′59″N 1°06′24″W"},

  { name: "HMHS Britannic", image: "/ShipWreckPictures/HMHSBritannic2.png", reasonForSinking: "War/battle damage", yearSunk: "1913", country: "United Kingdom", bodyOfWater: "Aegean Sea", casualties: "28", coordinates: "37°42′05″N 24°17′02″E"},

  { name: "MS Estonia", image: "/ShipWreckPictures/MSEstonia1.png", reasonForSinking: "Onboard accident", yearSunk: "1994", country: "Estonia", bodyOfWater: "Baltic Sea", casualties: "850", coordinates: "59°23′0″N 21°40′0″E"},

  { name: "Queen Anne's Revenge", image: "/ShipWreckPictures/QueenAnnesRevenge1.png", reasonForSinking: "Ran aground", yearSunk: "1718", country: "United Kingdom", bodyOfWater: "Atlantic Ocean", casualties: "0", coordinates: "34°41′44″N 76°41′20″W"},

  { name: "RMS Lustitania", image: "", reasonForSinking: "War/battle damage", yearSunk: "1915", country: "United Kingdom", bodyOfWater: "Atlantic Ocean", casualties: "1198", coordinates: "51°25′N 8°33′W"},

  { name: "HMS Terror", image: "", reasonForSinking: "Icebound/abandoned", yearSunk: "1848", country: "United Kingdom", bodyOfWater: "Arctic Ocean", casualties: "129", coordinates: "68°54′N 98°56′W (approximate)"},

  { name: "HMS Erebus", image: "", reasonForSinking: "Icebound/abandoned", yearSunk: "1848", country: "United Kingdom", bodyOfWater: "Arctic Ocean", casualties: "129", coordinates: "68°14′44.8″N 98°52′22.3″W (approximate)"},

  { name: "USS Monitor", image: "", reasonForSinking: "Weather", yearSunk: "1862", country: "United States", bodyOfWater: "North ATlantic Ocean", casualties: "16", coordinates: "35°0′6″N 75°24′23″W"},

  { name: "MV Doña Paz", image: "", reasonForSinking: "Collision", yearSunk: "1987", country: "Philippines", bodyOfWater: "Tablas Strait", casualties: "4385", coordinates: "N/A"},

  { name: "Battleship Yamato", image: "", reasonForSinking: "War/battle damage", yearSunk: "1945", country: "Japan", bodyOfWater: "East China Sea", casualties: "3055", coordinates: "Lat 30° 22' N Long 128° 04' E"},

  { name: "The White Ship", image: "", reasonForSinking: "Collision", yearSunk: "1120", country: "United Kingdom", bodyOfWater: "English Channel", casualties: "300", coordinates: "N/A"},

  { name: "SS Edmund Fitzgerald", image: "", reasonForSinking: "Unknown", yearSunk: "1975", country: "United States", bodyOfWater: "Lake Superior", casualties: "29", coordinates: "46°59.91′N 85°06.61′W"},

  { name: "RFS Moskva", image: "", reasonForSinking: "War/battle damage", yearSunk: "2022", country: "Russia", bodyOfWater: "Black Sea", casualties: "0", coordinates: "45°10′43″N 30°55′31″E"},

  { name: "Felicity Ace", image: "", reasonForSinking: "Onboard accident", yearSunk: "2022", country: "Japan", bodyOfWater: "Atlantic Ocean", casualties: "0", coordinates: "37.52861°N 28.98560°W"},

  { name: "MV Wilhelm Gustloff", image: "", reasonForSinking: "War/battle damage", yearSunk: "1945", country: "Germany", bodyOfWater: "Baltic Sea", casualties: "9600", coordinates: "55°04′22″N 17°25′17″E"},

  { name: "RMS Titanic", image: "", reasonForSinking: "Collision", yearSunk: "1912", country: "United Kingdom", bodyOfWater: "Atlantic Ocean", casualties: "1500", coordinates: "41°43′57″N 49°56′49″W"},

  { name: "USS Rodolph", image: "", reasonForSinking: "War/battle damage", yearSunk: "1865", country: "United States", bodyOfWater: "Blakeley River", casualties: "4", coordinates: "N/A"},
];

// Placeholder for getSavedShipWreckIds function
const getSavedShipWreckIds = () => {
  // Implement the logic to retrieve saved shipWreck ids from local storage
  // For example:
  // const savedShipWreckIds = JSON.parse(localStorage.getItem('savedShipWreckIds')) || [];
  // return savedShipWreckIds;
  return [];
};

const SearchShipWrecks = () => {
  const [searchedShipWrecks, setSearchedShipWrecks] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [saveShipWreck] = useMutation(SAVE_SHIPWRECK);
  const [savedShipWreckIds, setSavedShipWreckIds] = useState(getSavedShipWreckIds());
  const [selectedShipwreck, setSelectedShipwreck] = useState("");

  useEffect(() => {
    setSavedShipWreckIds(savedShipWreckIds);
    console.log("Saved ShipWreck Ids:", savedShipWreckIds);
  }, [savedShipWreckIds]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
  
    if (!selectedShipwreck) {
      return false;
    }
  
    try {
      const selectedShipwreckDetails = shipwrecks[selectedShipwreck];
  
      if (!selectedShipwreckDetails) {
        throw new Error("Selected shipwreck not found!");
      }
  
      const shipWreckData = [
        {
          ...selectedShipwreckDetails,
          description: 
          `Coordinates: ${selectedShipwreckDetails.coordinates}\nYear Sunk: ${selectedShipwreckDetails.yearSunk}\nCasualties: ${selectedShipwreckDetails.casualties}\nCountry: ${selectedShipwreckDetails.country}`,
          image: selectedShipwreckDetails.image || "",
        },
      ];
  
      setSearchedShipWrecks(shipWreckData);
      setSelectedShipwreck("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveShipWreck = async (shipWreckId) => {
    const shipWreckToSave = searchedShipWrecks.find((shipWreck) => shipWreck.shipWreckId === shipWreckId);
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      setSavedShipWreckIds((prevSavedShipWreckIds) => [...prevSavedShipWreckIds, shipWreckToSave.shipWreckId]);

      const { data } = await saveShipWreck({
        variables: { newShipWreck: shipWreckToSave },
      });

      if (data?.saveShipWreck?._id && !savedShipWreckIds.includes(data.saveShipWreck._id)) {
        setSavedShipWreckIds((prevSavedShipWreckIds) => [...prevSavedShipWreckIds, data.saveShipWreck._id]);
      }
    } catch (err) {
      setSavedShipWreckIds((prevSavedShipWreckIds) =>
        prevSavedShipWreckIds.filter((savedShipWreckId) => savedShipWreckId !== shipWreckToSave.shipWreckId)
      );

      console.error("Save ShipWreck Mutation Error:", err);
    }
  };

  return (
    <>
      <div className="text-light bg-dark p-5" fluid="true">
        <Container>
          <h1>Search for Lost treasure!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Row>
              <Col xs={12} md={4}>
                <Form.Control
                  as="select"
                  value={selectedShipwreck}
                  onChange={(e) => setSelectedShipwreck(e.target.value)}
                  size="lg"
                >
                  <option value="" disabled>
                    Select a shipwreck
                  </option>
                  {shipwrecks.map((shipwreck, index) => (
                    <option key={index} value={index}>
                      {shipwreck.name}
                    </option>
                  ))}
                </Form.Control>
              </Col>
              <Col xs={12} md={4}>
                <Button type="submit" variant="success" size="lg">
                  Find treasure!
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>

      <Container>
        <h2 className="pt-5">
          {searchedShipWrecks.length
            ? `Viewing ${searchedShipWrecks.length} results:`
            : "Search for a shipWreck to begin"}
        </h2>
        <Row>
        {searchedShipWrecks.map((shipWreck, index) => (
  <Col md="4" key={index}>
    <Card border="dark">
      {shipWreck.image && (
        <Card.Img src={shipWreck.image} alt={`The cover for ${shipWreck.title}`} variant="top" />
      )}
      <Card.Body>
        <Card.Title>{shipWreck.name}</Card.Title>
        <Card.Text>
          <strong>Reason for Sinking:</strong> {shipWreck.reasonForSinking}<br />
          <strong>Year Sunk:</strong> {shipWreck.yearSunk}<br />
          <strong>Country:</strong> {shipWreck.country}<br />
          <strong>Body of Water:</strong> {shipWreck.bodyOfWater}<br />
          <strong>Casualties:</strong> {shipWreck.casualties}<br />
          <strong>Coordinates:</strong> {shipWreck.coordinates}
        </Card.Text>
        {Auth.loggedIn() && (
          <Button
            disabled={savedShipWreckIds?.some(
              (savedShipWreckId) => savedShipWreckId === String(shipWreck.shipWreckId)
            )}
            className="btn-block btn-info"
            onClick={() => handleSaveShipWreck(shipWreck.shipWreckId)}
          >
            {savedShipWreckIds?.some(
              (savedShipWreckId) => savedShipWreckId === String(shipWreck.shipWreckId)
            )
              ? "This shipWreck has already been saved!"
              : "Save this ShipWreck!"}
          </Button>
        )}
      </Card.Body>
    </Card>
  </Col>
))}
        </Row>
      </Container>
    </>
  );
};

export default SearchShipWrecks;
