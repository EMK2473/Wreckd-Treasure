import { Container, Card, Button, Row, Col } from "react-bootstrap";
import "../SavedWrecks.css";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import { REMOVE_SHIPWRECK } from "../utils/mutations";
import Auth from "../utils/auth";
import { removeShipWreckId } from "../utils/localStorage";

const SavedShipWrecks = () => {
  const { loading, data } = useQuery(GET_ME);
  const [removeShipWreck] = useMutation(REMOVE_SHIPWRECK);

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  const userData = data ? data.me : {};

  if (!Auth.loggedIn()) {
    return <h2>Please log in to view your saved expeditions.</h2>;
  }

  const handleDeleteShipWreck = async (shipWreckId) => {
    try {
      const response = await removeShipWreck({
        variables: { shipWreckId },
      });

      const updatedUser = response.data.removeShipWreck();
      removeShipWreckId(shipWreckId);
    } catch (err) {
      console.error(err);
    }
  };

  if (!userData || !userData.savedShipWrecks) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div className="saved-shipwreck-container text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved expeditions!</h1>
        </Container>
      </div>
      <Container>
        <h2 className="pt-5">
          {userData.savedShipWrecks.length
            ? `Viewing ${userData.savedShipWrecks.length} saved ${
                userData.savedShipWrecks.length === 1 ? "shipWreck" : "shipWrecks"
              }:`
            : "You have no saved expeditions!"}
        </h2>
        <Row>
          {userData.savedShipWrecks.map((shipWreck) => {
            return (
              <Col md="4">
                <Card key={shipWreck.shipWreckId} border="dark">
                  {shipWreck.image ? (
                    <Card.Img
                      src={shipWreck.image}
                      alt={`The cover for ${shipWreck.title}`}
                      variant="top"
                    />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{shipWreck.name}</Card.Title>
                    <p className="small">Authors: {shipWreck.bodyOfWater}</p>
                    <Card.Text>
                      {shipWreck.chair ? shipWreck.chair : "No Chair"}
                    </Card.Text>
                    <Button
                      className="btn-block btn-danger"
                      onClick={() => handleDeleteShipWreck(shipWreck.shipWreckId)}
                    >
                      Delete this ShipWreck!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedShipWrecks;
