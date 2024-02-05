import React, { useState, useRef, useEffect } from "react";
import { Container, Col, Button, Row, Modal, Tab, Nav } from "react-bootstrap";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import Auth from "../utils/auth";
import Confetti from "react-confetti";
import "../App.css";
import App from '../App'

const LandingPage = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(Auth.loggedIn());
  const [confettiActive, setConfettiActive] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef();

  useEffect(() => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setButtonPosition({ x: rect.left, y: rect.top });
    }
  }, [buttonRef]);

  const handleYesButtonClick = () => {
    setShowLoginForm(true);
    setShowSignupForm(true);
    setConfettiActive(true);

    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setButtonPosition({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    }
  };
  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const handleLoginSignup = () => {
    setUserLoggedIn(Auth.loggedIn());
    setConfettiActive(false);
    setShowLoginForm(false);
    setShowSignupForm(false);
  };

  if (userLoggedIn) {
    return <App />;
  }

  return (
    <Container fluid className="App">
      <div className="App-header">
        <>
          <img src={"/public/PirateGIF.gif"} className="App-logo" alt="logo" />
          <p>Argh, Matey. Ready to plunder some booty!?</p>
          <button
            className="action-button"
            onClick={handleYesButtonClick}
            ref={buttonRef}
          >
            Yes!
          </button>

          {confettiActive && (
            <Confetti
              numberOfPieces={149}
              width={2275}
              recycle={true}
              height={3000}
              gravity={0.6}
              drawShape={(ctx) => {
                ctx.beginPath();

                // Outer circle (main coin)
                ctx.arc(0, 0, 20, 0, 2 * Math.PI);
                ctx.fillStyle = "gold";
                ctx.fill();
                ctx.closePath();

                // Inner circle (3D effect?)
                ctx.beginPath();
                ctx.arc(0, 0, 18, 0, 2 * Math.PI);
                ctx.fillStyle = "rgba(255, 255, 255, 0.5 0.5 0.5)";
                ctx.fill();
                ctx.closePath();

                // Black "$" in center of coin
                ctx.font = "24px Arial";
                ctx.fillStyle = "black";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText("$", 0, 0);
              }}
              position={{
                x: getRandomInt(0, window.innerWidth),
                y: getRandomInt(-50, -10), // can prob scrap this, wasn't working as intended
              }}
            />
          )}
        </>
        {showLoginForm && (
          <LoginForm
            onClose={() => {
              setShowLoginForm(false);
              handleLoginSignup();
            }}
          />
        )}
        {showSignupForm && (
          <SignupForm
            onClose={() => {
              setShowSignupForm(false);
              handleLoginSignup();
            }}
          />
        )}
        </div>
      </Container>
  );
};

export default LandingPage;