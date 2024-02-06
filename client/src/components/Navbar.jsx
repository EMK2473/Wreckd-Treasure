import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Modal, Tab } from "react-bootstrap";
import SignUpForm from "./SignupForm";
import LoginForm from "./LoginForm";

import Auth from "../utils/auth";

const AppNavbar = () => {
  const [showModal, setShowModal] = useState(false);
  const handleMouseEnter = (event) => {
    event.target.classList.add("gold-text");
  };

  const handleMouseLeave = (event) => {
    event.target.classList.remove("gold-text");
  };
  return (
    <>
      <Navbar bg='dark' variant='dark' expand='lg'>
        <Container fluid>
          <Navbar.Brand as={Link} to='/'>
            Wreck'd Treasure
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='navbar' />
          <Navbar.Collapse id='navbar' className='d-flex flex-row-reverse'>
            <Nav className='ml-auto d-flex'>
              {Auth.loggedIn() && (
              <Nav.Link
              as={Link}
              to='/map'
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Treasure Map
            </Nav.Link>
              )}
              {Auth.loggedIn() && (
                <Nav.Link
                  as={Link}
                  to='/'
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  Search
                </Nav.Link>
              )}
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link
                    as={Link}
                    to='/saved'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    Your Expeditions
                  </Nav.Link>
                  <Nav.Link onClick={Auth.logout} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    Log out
                  </Nav.Link>
                </>
              ) : (
                <Nav.Link onClick={() => setShowModal(true)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                  Log in/Sign up
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Modal
        size="lg"
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby="signup-modal"
      >
        <Tab.Container defaultActiveKey="login">
          <Modal.Header closeButton>
            <Modal.Title id="signup-modal">
              <Nav variant="pills">
                <Nav.Item>
                  <Nav.Link eventKey="login">Log in.</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="signup">Sign up.</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey="login">
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey="signup">
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};

export default AppNavbar;
