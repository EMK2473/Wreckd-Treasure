// LoginForm.js
import { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { LOGIN_USER } from "../utils/mutations";

const LoginForm = () => {
  // state variables and functions
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [loginUser, { error }] = useMutation(LOGIN_USER);

  useEffect(() => {
    if (error) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [error]);

  // functioon to update change in form data
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  // function to handle form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    try {
      const response = await loginUser({
        variables: { ...userFormData },
      });
      Auth.login(response.data.login.token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      email: "",
      password: "",
    });
  };

  return (
    <>
      <div className="form-container">
        <Form
          noValidate
          validated={validated}
          onSubmit={handleFormSubmit}
          className="login-form"
        >
          <Alert
            dismissible
            onClose={() => setShowAlert(false)}
            show={showAlert}
            variant="danger"
          >
            Something went wrong with your login credentials!
          </Alert>
          <Form.Group className="mb-3" style={{ color: "white" }}>
            <Form.Label htmlFor="email" style={{ margin: "5px" }}>
              Email
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Your email"
              name="email"
              onChange={handleInputChange}
              value={userFormData.email}
              required
            />
            <Form.Control.Feedback type="invalid">
              Email is required!
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" style={{ color: "white" }}>
            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Your password"
              name="password"
              onChange={handleInputChange}
              value={userFormData.password}
              required
            />
            <Form.Control.Feedback type="invalid">
              Password is required!
            </Form.Control.Feedback>
          </Form.Group>
          <div style={{ textAlign: "center" }}>
            {" "}
            <Button
              disabled={!(userFormData.email && userFormData.password)}
              type="submit"
              style={{
                backgroundColor: "#F4CB5C",
                color: "#000000",
                borderColor: "#ffffff",
              }}
              variant="success"
            >
              Login
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};
export default LoginForm;
