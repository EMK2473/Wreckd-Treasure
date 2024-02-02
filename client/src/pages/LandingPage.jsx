import React, { useState } from 'react';
import { Container, Col, Form, Button, Card, Row } from 'react-bootstrap';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import SearchShipWrecks from './SearchShipWrecks';
import Auth  from '../utils/auth';

const LandingPage = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(Auth.loggedIn());

  const handleYesButtonClick = () => {
    setShowLoginForm(true);
    setShowSignupForm(false);
  };

  const handleNoButtonClick = () => {
    setShowLoginForm(false);
    setShowSignupForm(true);
  };

  const handleLoginSignup = () => {
    // Handle login or signup logic here

    // After successful login or signup, update the state to reflect user logged in
    setUserLoggedIn(true);
  };

  // Redirect to SearchShipWrecks if the user is logged in
  if (userLoggedIn) {
    return <Navigate to="/app" />;
  }

  return (
    <div className="App">
      <header className="App-header">
        <>
          <img src={''} className="App-logo" alt="logo" />
          <p>Argh, Matey. Ready to plunder some booty!?</p>
          <button onClick={handleYesButtonClick}>Yes!</button>
          <button onClick={handleNoButtonClick}>No.</button>
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