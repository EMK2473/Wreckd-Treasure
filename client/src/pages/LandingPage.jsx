import React, { useState, useRef, useEffect } from "react";
import { Container, Tabs, Tab } from "react-bootstrap";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import Auth from "../utils/auth";
import "../App.css";
import App from "../App";

const LandingPage = () => {
  // use state variables and functions
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(Auth.loggedIn());
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const [enterButtonClicked, setEnterButtonClicked] = useState(false);
  const buttonRef = useRef(); 

  useEffect(() => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setButtonPosition({ x: rect.left, y: rect.top });
    }
  }, [buttonRef]);

  // function to handle Yes/Enter
  const handleYesButtonClick = () => {
    setEnterButtonClicked(true);
    setShowLoginForm(true);

    document.body.classList.add('new-background-class');
  };

  // function to handle Login/Signup tabs
  const handleTabClick = (form) => {
    if (form === "login") {
      setShowLoginForm(true);
      setShowSignupForm(false);
    } else if (form === "signup") {
      setShowLoginForm(false);
      setShowSignupForm(true);
    }
  };

  // function to handle login and sign up forms
  const handleLoginSignup = () => {
    setUserLoggedIn(Auth.loggedIn());
    setConfettiActive(false);
    setShowLoginForm(false);
    setShowSignupForm(false);
  };

  if (userLoggedIn) {
    return (
      <>
        <App />
      </>
    );
  }

  return (
    <Container fluid className="landing-page-container">
      <div className="App-header">
        <>
          {!enterButtonClicked && (
            <>
              <p className="pirate-text">
                Argh, Matey. Ready to plunder some booty!?
              </p>
              <img src={"/logo-1.png"} className="App-logo" alt="logo" />
            </>
          )}
          {!enterButtonClicked && (
            <button
              id="enterBTN"
              className="action-button"
              onClick={handleYesButtonClick}
              ref={buttonRef}
            >
              Enter
            </button>
          )}
        </>

        {enterButtonClicked && (
          <div style={{ marginTop: "50px" }}>
            <Tabs
              activeKey={showLoginForm ? "login" : "signup"}
              onSelect={handleTabClick}
              id="login-signup-tabs"
              className="mb-3 d-flex justify-content-center"
              style={{ position: "absolute", top: "250px", width: "100%" }}
            >
              <Tab
                eventKey="login"
                title={
                  <span
                    style={{
                      color: "#000000",
                      backgroundColor: "#fada8a",
                      padding: "5px 15px",
                      marginTop: "50px", 
                    }}
                  >
                    Login
                  </span>
                }
              >
                {showLoginForm && (
                  <LoginForm handleLoginSignup={handleLoginSignup} />
                )}
              </Tab>
              <Tab
                eventKey="signup"
                title={
                  <span
                    style={{
                      color: "#000000",
                      backgroundColor: "#fada8a",
                      padding: "5px 15px",
                      marginTop: "100px", 
                    }}
                  >
                    Sign Up
                  </span>
                }
              >
                {showSignupForm && (
                  <SignupForm handleLoginSignup={handleLoginSignup} />
                )}
              </Tab>
            </Tabs>
          </div>
        )}
      </div>
    </Container>
  );
};

export default LandingPage;
