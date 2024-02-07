import React, { useState, useEffect } from "react";
import { Container, Col, Form, Button, Card, Row } from "react-bootstrap";
import ShipwreckMap from "../components/ShipwreckMap";
import Auth from "../utils/auth";
import { useMutation } from "@apollo/client";
import { SAVE_SHIPWRECK } from "../utils/mutations";
import shipwrecks from "./ShipWreckData";

// Placeholder for getSavedShipWreckIds function
const getSavedShipWreckIds = () => {
  const savedShipWreckIds = JSON.parse(localStorage.getItem('savedShipWreckIds')) || [];
  return savedShipWreckIds;
  return [];
};

const SearchShipWrecks = () => {
  const [searchedShipWrecks, setSearchedShipWrecks] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [saveShipWreck] = useMutation(SAVE_SHIPWRECK);
  const [savedShipWreckIds, setSavedShipWreckIds] = useState(
    getSavedShipWreckIds()
  );
  const [selectedShipwreck, setSelectedShipwreck] = useState("");

  useEffect(() => {
    setSavedShipWreckIds(savedShipWreckIds);
    console.log("Saved ShipWreck Id:", savedShipWreckIds);
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
          description: `Coordinates: ${selectedShipwreckDetails.coordinates}\nYear Sunk: ${selectedShipwreckDetails.yearSunk}\nCasualties: ${selectedShipwreckDetails.casualties}\nCountry: ${selectedShipwreckDetails.country}`,
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
    const shipWreckToSave = searchedShipWrecks.find(
      (shipWreck) => shipWreck.shipWreckId === shipWreckId
    );
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      console.log("ShipWreck to Save:", shipWreckToSave);
      console.log('token', token)
      setSavedShipWreckIds((prevSavedShipWreckIds) => [
        ...prevSavedShipWreckIds,
        shipWreckToSave.shipWreckId,
      ]);
      const { data } = await saveShipWreck({
        variables: { newShipWreck: shipWreckToSave },
      });
      if (
        data?.saveShipWreck?._id &&
        !savedShipWreckIds.includes(data.saveShipWreck._id)
      ) {
        setSavedShipWreckIds((prevSavedShipWreckIds) => [
          ...prevSavedShipWreckIds,
          data.saveShipWreck._id,
        ]);
      }
    } catch (err) {
      // setSavedShipWreckIds((prevSavedShipWreckIds) =>
      //   prevSavedShipWreckIds.filter(
      //     (savedShipWreckId) => savedShipWreckId !== shipWreckToSave.shipWreckId
      //   )
      // );

      console.error("Save ShipWreck Mutation Error:", err);
    }
  };

  return (
    <>
      <div className="text-light p-5" fluid="true">
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
                  <Card.Img
                    src={shipWreck.image}
                    alt={`The cover for ${shipWreck.title}`}
                    variant="top"
                  />
                )}
                <Card.Body>
                  <Card.Title>{shipWreck.name}</Card.Title>
                  <Card.Text>
                    <strong>Rarity: </strong> {shipWreck.rarity}
                    <br />
                    <strong>Treasure: </strong> <br /><span style={{ fontSize: '2em' }}>{shipWreck.treasure}</span>
                    <br />
                    <strong>Reason for Sinking:</strong>{" "}
                    {shipWreck.reasonForSinking}
                    <br />
                    <strong>Year Sunk:</strong> {shipWreck.yearSunk}
                    <br />
                    <strong>Country:</strong> {shipWreck.country}
                    <br />
                    <strong>Body of Water:</strong> {shipWreck.bodyOfWater}
                    <br />
                    <strong>Casualties:</strong> {shipWreck.casualties}
                    <br />
                    <strong>Coordinates:</strong> {shipWreck.coordinates}
                  </Card.Text>
                  {shipWreck.coordinates && (
                    <ShipwreckMap shipwreck={shipWreck} />
                  )}
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedShipWreckIds?.some(
                        (savedShipWreckId) =>
                          savedShipWreckId === String(shipWreck.shipWreckId)
                      )}
                      className="bookBTN btn-block btn-info"
                      onClick={() => handleSaveShipWreck(shipWreck.shipWreckId)}
                    >
                      {savedShipWreckIds?.some(
                        (savedShipWreckId) =>
                          savedShipWreckId === String(shipWreck.shipWreckId)
                      )
                        ? "Expedition Booked!"
                        : "Book an expedition!"}
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