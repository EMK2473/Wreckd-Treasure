import { useState, useEffect } from 'react';
import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';

// bring in hooks/queries/mutations
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { REMOVE_SHIPWRECK } from '../utils/mutations';

// remove API call
// import { getMe, deleteShipWreck } from '../utils/API';
import Auth from '../utils/auth';
import { removeShipWreckId } from '../utils/localStorage';
const SavedShipWrecks = () => {
  const { loading, data } = useQuery(GET_ME);
  const [removeShipWreck] = useMutation(REMOVE_SHIPWRECK);

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  const userData = data ? data.me : {};

  // Check if the user is authenticated
  if (!Auth.loggedIn()) {
    // Redirect to the login page or handle unauthorized access
    return <h2>Please log in to view your saved expeditions.</h2>;
  }

  

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteShipWreck = async (bookId) => {
    try {
      const response = await removeShipWreck({
        variables: { bookId }
      });

      const updatedUser = response.data.removeShipWreck;
      // setUserData(updatedUser);
      // no need to call setUserData

      
      // upon success, remove book's id from localStorage
      removeShipWreckId(bookId);
    } catch (err) {
      console.error(err);
    }
  };


// if data isn't here yet, say so
if (!userData || !userData.savedShipWrecks) {
  return <h2>LOADING...</h2>;
}


  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved expeditions!</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.savedShipWrecks.length
            ? `Viewing ${userData.savedShipWrecks.length} saved ${userData.savedShipWrecks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved expeditions!'}
        </h2>
        <Row>
  {userData.savedShipWrecks.map((book) => {
    return (
      <Col md="4">
        <Card key={book.bookId} border='dark'>
          {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
          <Card.Body>
            <Card.Title>{book.title}</Card.Title>
            <p className='small'>Authors: {book.authors}</p>
            <Card.Text>{book.description}</Card.Text>
            <Button className='btn-block btn-danger' onClick={() => handleDeleteShipWreck(book.bookId)}>
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
