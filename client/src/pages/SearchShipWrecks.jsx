import { useState, useEffect } from "react";
import { Container, Col, Form, Button, Card, Row } from "react-bootstrap";

//graphql import
import { useMutation } from "@apollo/client";
//import mutation
import { SAVE_SHIPWRECK } from "../utils/mutations";
//import helpers
import Auth from "../utils/auth";
import shipwrecks from "./ShipWreckData";
import ShipwreckMap from "../components/ShipwreckMap";

//import shipwreck search API
const getSavedShipWreckIds = () => {
  const savedShipWreckIds =
    JSON.parse(localStorage.getItem("savedShipWreckIds")) || [];
  return savedShipWreckIds;
  // return [];
};

const SearchShipWrecks = () => {
  //create state - hold returned shipwreck data
  const [searchedShipWrecks, setSearchedShipWrecks] = useState([]);
  //create state - hold search field data
  const [selectedShipwreck, setSelectedShipwreck] = useState("");
  //create state - hold saved shipWreckId values
  const [savedShipWreckIds, setSavedShipWreckIds] = useState(
    getSavedShipWreckIds()
  );

  //get user's saved shipwrecks on component load
  useEffect(() => {
    setSavedShipWreckIds(savedShipWreckIds);
    console.log("Saved ShipWreck Id:", savedShipWreckIds);
  }, [savedShipWreckIds]);

  //mutation request
  const [saveShipWreck] = useMutation(SAVE_SHIPWRECK);

  //search shipwrecks & set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    //validate search input
    if (!selectedShipwreck) {
      return false;
    }
    //get shipwreck details
    try {
      const selectedShipwreckDetails = shipwrecks[selectedShipwreck];
      if (!selectedShipwreckDetails) {
        throw new Error("shipwreck not found!");
      }

      //filter shipwreck data
      const shipWreckData = [
        {
          ...selectedShipwreckDetails,
          description: `Coordinates: ${selectedShipwreckDetails.coordinates}\nYear Sunk: ${selectedShipwreckDetails.yearSunk}\nCasualties: ${selectedShipwreckDetails.casualties}\nCountry: ${selectedShipwreckDetails.country}`,
          image: selectedShipwreckDetails.image || "",
        },
      ];

      //state update
      setSearchedShipWrecks(shipWreckData);
      setSelectedShipwreck("");
    } catch (err) {
      console.error(err);
    }
  };

  //save shipwreck to user's account
  const handleSaveShipWreck = async (shipWreckId) => {
    //find shipwreck in `searchedShipWrecks` state by the matching id
    const shipWreckToSave = searchedShipWrecks.find(
      (shipWreck) => shipWreck.shipWreckId === shipWreckId
    );
    //get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    //validate token
    if (!token) {
      return false;
    }
    //make mutation request
    try {
      console.log("ShipWreck to Save:", shipWreckToSave);
      console.log("token", token);

      //set updated user object
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
      <div className="text-light p-5">
        <Container>
          <h1>Search for Lost treasure!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Row>
              <Col xs={12} md={4}>
                <Form.Control
                  as="select"
                  value={selectedShipwreck}
                  onChange={(e) => setSelectedShipwreck(e.target.value)}
                  size="sm"
                >
                  <option value="" disabled>
                    select shipwreck
                  </option>
                  {shipwrecks.map((shipwreck, index) => (
                    <option key={index} value={index}>
                      {shipwreck.name}
                    </option>
                  ))}
                </Form.Control>
              </Col>
              <Col xs={12} md={4}>
                <Button type="submit" variant="success" size="sm">
                  plunder
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>

      <Container>
        <h3 className="pt-2 text-light">
          {searchedShipWrecks.length
            ? `viewing ${searchedShipWrecks.length} results:`
            : "plunder for a shipwreck to begin"}
        </h3>
        <Row>
          {searchedShipWrecks.map((shipWreck, index) => (
            <Col md="4" key={index}>
              <Card border="dark">
                {shipWreck.image ? (
                  <Card.Img
                    src={shipWreck.image}
                    alt={`The cover for ${shipWreck.title}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{shipWreck.name}</Card.Title>

                  <Card.Text>
                    <strong>Rarity: </strong> {shipWreck.rarity}
                    <br />
                    <strong>Treasure: </strong> <br />
                    <span style={{ fontSize: "2em" }}>
                      {shipWreck.treasure}
                    </span>
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
                      size="sm"
                    >
                      {savedShipWreckIds?.some(
                        (savedShipWreckId) =>
                          savedShipWreckId === String(shipWreck.shipWreckId)
                      )
                        ? "expedition booked!"
                        : "book expedition!"}
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
