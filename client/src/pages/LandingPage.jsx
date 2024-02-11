import { useState } from "react";
import { Container, Tabs, Tab, Button } from "react-bootstrap";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import Auth from "../utils/auth";
import "../App.css";
import App from "../App";
import Confetti from "js-confetti";

const LandingPage = () => {
  // state variables and set functions
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(Auth.loggedIn());
  const [enterButtonClicked, setEnterButtonClicked] = useState(false);
  // const plunderButtonRef = useRef(null);

  // function to trigger confetti
  const handleConfetti = () => {
    const confetti = new Confetti();
    for (let i = 0; i < 5; i++) {
      // Add 300 confetti pieces
      confetti.addConfetti({
        emojis: ["💎", "🪙", "🏴‍☠️", "💰"],
      });
    }
  };

  // function handling enter button state
  const handleYesButtonClick = () => {
    setEnterButtonClicked(true);
    setShowLoginForm(true);
    document.body.classList.add("new-background-class");
    handleConfetti();
  };

  // function to handle login/signup tab states
  // handles changing background states, too
  const handleTabClick = (form) => {
    if (form === "login") {
      setShowLoginForm(true);
      setShowSignupForm(false);
      document.body.classList.remove("signup-background-class"); // Remove signup background class
      document.body.classList.add("login-background-class"); // Add login background class
    } else if (form === "signup") {
      setShowLoginForm(false);
      setShowSignupForm(true);
      document.body.classList.remove("login-background-class"); // Remove login background class
      document.body.classList.add("signup-background-class"); // Add signup background class
    }
      document.body.classList.remove("signup-background-class"); 
      document.body.classList.add("login-background-class"); 
    } else if (form === "signup") {
      setShowLoginForm(false);
      setShowSignupForm(true);
      document.body.classList.remove("login-background-class");
      document.body.classList.add("signup-background-class"); 
      document.body.classList.add("login-background-class");
    } 
  };

  // function to handle login and sign up form states
  const handleLoginSignup = () => {
    setUserLoggedIn(Auth.loggedIn());
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
<Container fluid className="landing-page-container custom-background-class">
      <div className="App-header">
        <>
          {!enterButtonClicked && (
            <>
              <img
                src={"/logo-1.png"}
                className="App-logo"
                alt="logo"
                style={{ width: "400px", height: "400px", marginTop: "50px" }}
              />
            </>
          )}
          {!enterButtonClicked && (
            <Button
              variant="primary"
              style={{
                display: "block",
                margin: "auto",
                marginTop: "50px",
                backgroundColor: "black",
                color: "#fada8a",
                borderColor: "#fada8a",
                width: "150px",
                position: "relative",
                overflow: "hidden",
              }}
              className="action-button"
              onClick={handleYesButtonClick}
            >
              <span className="button-text">plunder</span>
              <span className="hover-effect" />
            </Button>
          )}
        </>

        {enterButtonClicked && (
          <div style={{ marginTop: "50px" }}>
            <Tabs
              activeKey={showLoginForm ? "login" : "signup"}
              onSelect={handleTabClick}
              id="login-signup-tabs"
              className="mb-3 d-flex justify-content-center tabs-container"
            >
              <Tab
                eventKey="login"
                title={
                  <span
                    style={{
                      backgroundColor: "transparent",
                      marginTop: "50px",
                      borderRadius: "10px",
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
                      // backgroundColor: "transparent",
                      marginTop: "50px",
                      backgroundColor: "transparent",
                      padding: "5px 15px",
                      marginTop: "100px",
                      borderRadius: "10px",
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
