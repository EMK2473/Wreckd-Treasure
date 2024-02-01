import React, { useState, useEffect } from "react";
import { Container, Col, Form, Button, Card, Row } from "react-bootstrap";

import Auth from "../utils/auth";
import { useMutation } from "@apollo/client";
import { SAVE_BOOK } from "../utils/mutations";

const shipwrecks = [
  {
    name: 'Empress of Ireland',
    shipwreckId: 'empress_ireland',
    image: '[URL]',
    coordinates: '48°37.5′N 68°24.5′W',
    causeOfWreck: 'Collision',
    yearSunk: '1914',
    casualties: '1012',
    country: 'UK',
  },
  {
    name: 'RMS Titanic',
    shipwreckId: 'titanic',
    image: '[URL]',
    coordinates: '41°43′57″N 49°56′54″W',
    causeOfWreck: 'Iceberg collision',
    yearSunk: '1912',
    casualties: '1502',
    country: 'North Atlantic Ocean',
  },
  {
    name: 'USS Arizona',
    shipwreckId: 'uss_arizona',
    image: '[URL]',
    coordinates: '21°21′23″N 157°57′57″W',
    causeOfWreck: 'Attack on Pearl Harbor',
    yearSunk: '1941',
    casualties: '1177',
    country: 'USA',
  },
  {
    name: 'Mary Rose',
    shipwreckId: 'mary_rose',
    image: '[URL]',
    coordinates: '50°47′06″N 1°06′54″W',
    causeOfWreck: 'Capsized',
    yearSunk: '1545',
    casualties: '500',
    country: 'UK',
  },
];

// Placeholder for getSavedBookIds function
const getSavedBookIds = () => {
  // Implement the logic to retrieve saved book ids from local storage
  // For example:
  // const savedBookIds = JSON.parse(localStorage.getItem('savedBookIds')) || [];
  // return savedBookIds;
  return [];
};

const SearchBooks = () => {
  const [searchedBooks, setSearchedBooks] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [saveBook] = useMutation(SAVE_BOOK);
  const [savedBookIds, setSavedBookIds] = useState(getSavedBookIds());
  const [selectedShipwreck, setSelectedShipwreck] = useState("");

  useEffect(() => {
    setSavedBookIds(savedBookIds);
    console.log("Saved Book Ids:", savedBookIds);
  }, [savedBookIds]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!selectedShipwreck) {
      return false;
    }

    try {
      const selectedShipwreckDetails = shipwrecks.find(
        (shipwreck) => shipwreck.shipwreckId === selectedShipwreck
      );

      if (!selectedShipwreckDetails) {
        throw new Error("Selected shipwreck not found!");
      }

      const bookData = [
        {
          bookId: selectedShipwreckDetails.shipwreckId,
          authors: ["No author to display"],
          title: selectedShipwreckDetails.name,
          description: `Coordinates: ${selectedShipwreckDetails.coordinates}\nYear Sunk: ${selectedShipwreckDetails.yearSunk}\nCasualties: ${selectedShipwreckDetails.casualties}\nCountry: ${selectedShipwreckDetails.country}`,
          image: selectedShipwreckDetails.image || "",
        },
      ];

      setSearchedBooks(bookData);
      setSelectedShipwreck("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveBook = async (bookId) => {
    const bookToSave = searchedBooks.find((book) => book.bookId === bookId);
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      setSavedBookIds((prevSavedBookIds) => [...prevSavedBookIds, bookToSave.bookId]);

      const { data } = await saveBook({
        variables: { newBook: bookToSave },
      });

      if (data?.saveBook?._id && !savedBookIds.includes(data.saveBook._id)) {
        setSavedBookIds((prevSavedBookIds) => [...prevSavedBookIds, data.saveBook._id]);
      }
    } catch (err) {
      setSavedBookIds((prevSavedBookIds) =>
        prevSavedBookIds.filter((savedBookId) => savedBookId !== bookToSave.bookId)
      );

      console.error("Save Book Mutation Error:", err);
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
                  {shipwrecks.map((shipwreck) => (
                    <option key={shipwreck.shipwreckId} value={shipwreck.shipwreckId}>
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
          {searchedBooks.length
            ? `Viewing ${searchedBooks.length} results:`
            : "Search for a book to begin"}
        </h2>
        <Row>
          {searchedBooks.map((book) => (
            <Col md="4" key={book.bookId}>
              <Card border="dark">
                {book.image ? (
                  <Card.Img
                    src={book.image}
                    alt={`The cover for ${book.title}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className="small">Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedBookIds?.some(
                        (savedBookId) => savedBookId === String(book.bookId)
                      )}
                      className="btn-block btn-info"
                      onClick={() => handleSaveBook(book.bookId)}
                    >
                      {savedBookIds?.some(
                        (savedBookId) => savedBookId === String(book.bookId)
                      )
                        ? "This book has already been saved!"
                        : "Save this Book!"}
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

export default SearchBooks;
