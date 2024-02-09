import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Modal, Tab } from "react-bootstrap";
// import SignUpForm from "./SignupForm";
// import LoginForm from "./LoginForm";
import Auth from "../utils/auth";

const AppNavbar = () => {
  //set modal display state
  const [showModal, setShowModal] = useState(false);

  //handle mouse enter and leave events
  const handleMouseEnter = (event) => {
    event.target.classList.add("gold-text");
  };
  const handleMouseLeave = (event) => {
    event.target.classList.remove("gold-text");
  };

  return (
    <>
      <Navbar variant="dark" expand="md" fixed="top">
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            wreckd treasure
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar" />
          <Navbar.Collapse id="navbar">
            <Nav className="ms-auto text-end">
                <Nav.Link as={Link} to="/" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                  search
                </Nav.Link>
{/* 
                <Nav.Link as={Link} to="/saved" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                  view treasure
                </Nav.Link> */}
              
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link onClick={Auth.logout} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    logout
                  </Nav.Link>
                </>
              ) : (
                <Nav.Link onClick={() => setShowModal(true)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                  login/signup
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
      {/* Content */}
      <div className="mt-20">
        {/* Add a margin-top to the content to prevent it from being hidden under the fixed navbar */}
        {/* Your content goes here */}
      </div>

      {/* Modal Component */}
      <Modal size="lg" show={showModal} onHide={() => setShowModal(false)} aria-labelledby="signup-modal">
        <Tab.Container defaultActiveKey="login">
          <Modal.Header closeButton>
            <Modal.Title id="signup-modal">
              <Nav variant="pills">
                <Nav.Item>
                  <Nav.Link eventKey="login">login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="signup">signup</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey="login">
                {/* Login Form Component */}
              </Tab.Pane>
              <Tab.Pane eventKey="signup">
                {/* Signup Form Component */}
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};

export default AppNavbar;
