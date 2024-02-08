import React, { useState, useRef, useEffect } from "react";
import { Container, Tabs, Tab } from "react-bootstrap";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import Auth from "../utils/auth";
import Confetti from "react-confetti";
import "../App.css";
import App from "../App";

const LandingPage = () => {
  // use state variables and functions
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(Auth.loggedIn());
  const [confettiActive, setConfettiActive] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const [enterButtonClicked, setEnterButtonClicked] = useState(false);
  const buttonRef = useRef(); // returns reference object

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
    setConfettiActive(true);

    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      setButtonPosition({ x: centerX, y: centerY });
    }
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

          {confettiActive && (
            <Confetti
              numberOfPieces={149}
              width={2275}
              recycle={false}
              height={3000}
              gravity={0.6}
              drawShape={(ctx) => {
                ctx.beginPath();
                ctx.arc(0, 0, 20, 0, 2 * Math.PI);
                ctx.fillStyle = "gold";
                ctx.fill();
                ctx.closePath();

                ctx.beginPath();
                ctx.arc(0, 0, 18, 0, 2 * Math.PI);
                ctx.fillStyle = "rgba(255, 255, 255, 0.5 0.5 0.5)";
                ctx.fill();
                ctx.closePath();

                ctx.font = "24px Arial";
                ctx.fillStyle = "black";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText("$", 0, 0);
              }}
            />
          )}
        </>

        {enterButtonClicked && (
          <div style={{ marginTop: "350px" }}>
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
                      marginTop: "100px", 
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
