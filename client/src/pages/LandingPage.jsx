import React, { useState } from 'react';
import { Container, Col, Button, Row, Modal, Tab, Nav } from 'react-bootstrap';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import Auth from '../utils/auth';
// import backgroundImage from '../path/to/your/image.jpg'; // Adjust the path accordingly

import SearchShipWrecks from "./SearchShipWrecks"
import App from '../App';
// import SavedShipWrecks from "./pages/SavedShipWrecks";
// import Navbar from "./components/Navbar";
import '../App.css'
const LandingPage = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(Auth.loggedIn());

  const handleYesButtonClick = () => {
    setShowLoginForm(true);
    setShowSignupForm(true);
  };

  // const handleNoButtonClick = () => {
  //   setShowLoginForm(false);
  //   setShowSignupForm(false);
  // };

  const handleLoginSignup = () => {
    // Handle login or signup logic here
    setUserLoggedIn(Auth.loggedIn()); // Update userLoggedIn state

    // After successful login or signup, update the state to reflect user logged in
    // setUserLoggedIn(true);
    
    // Redirect to SearchShipWrecks after successful login or signup
    setShowLoginForm(false);
    setShowSignupForm(false);
  };

  // Redirect to SearchShipWrecks if the user is logged in
  // Redirect to LandingPage if the user is not logged in
  if (userLoggedIn) {
    return <App />;
  }

  return (
    <div className="App">
      <header className="App-header">
        <>
          <img src={'/public/PirateGIF.gif'} className="App-logo" alt="logo" />
          <p>Argh, Matey. Ready to plunder some booty!?</p>
          <button className="action-button" onClick={handleYesButtonClick}>Yes!</button>
          {/* <button className="action-button" onClick={handleNoButtonClick}>No.</button> */}
        </>
        {showLoginForm && (
          <LoginForm onClose={() => {
            setShowLoginForm(false);
            handleLoginSignup();
          }} />
        )}
        {showSignupForm && (
          <SignupForm onClose={() => {
            setShowSignupForm(false);
            handleLoginSignup();
          }} />
        )}
      </header>
    </div>
  );
};

export default LandingPage;