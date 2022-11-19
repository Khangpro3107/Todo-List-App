import React, { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// const URL = process.env.REACT_APP_BACKEND_URL;
const URL = "https://todolist-api-gwhc.onrender.com/";

const Register = () => {
  const navigate = useNavigate();

  const usernameRef = useRef();
  const passwordRef = useRef();
  const passwordAgainRef = useRef();
  const [error, setError] = useState(null);

  const handleRegister = async () => {
    if (passwordRef.current.value !== passwordAgainRef.current.value) {
      return alert("Passwords don't match!");
    }
    const res = await axios.post(`${URL}register/find`, {
      username: usernameRef.current.value,
    });
    const isUsedUsername = res.data.result;
    if (isUsedUsername) {
      return alert("Username has already been used! Try another one.");
    }
    try {
      await axios.post(`${URL}register`, {
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      });
      alert("Registration successful. Please login."); // Don't use alert! Use timer countdown instead.
      return navigate("/login");
    } catch (error) {
      setError(error)
    }
  };

  return (
    <div className="container w-50 shadow p-3 mb-5 bg-body rounded">
      <form
        className="d-flex flex-column"
        onSubmit={(e) => {
          e.preventDefault();
          handleRegister();
        }}
      >
        <div className="mb-3">
          <label htmlFor="usernameInput" className="form-label">
            Username
          </label>
          <input
            ref={usernameRef}
            type="text"
            className="form-control"
            id="usernameInput"
            required
            maxLength="10"
            minLength="4"
            aria-describedby="usernameHelp"
          />
          <p className="form-text" id="usernameHelp">
            A username must be between 4 and 10 characters.
          </p>
        </div>
        <div className="mb-3">
          <label htmlFor="passwordInput" className="form-label">
            Password
          </label>
          <input
            ref={passwordRef}
            type="password"
            className="form-control"
            id="passwordInput"
            required
            maxLength="10"
            minLength="6"
            aria-describedby="passwordHelp"
          />
          <p className="form-text" id="passwordHelp">
            A password must be between 6 and 10 characters. Use a combination of
            letters, numbers and special characters to make your password more
            secure.
          </p>
        </div>
        <div className="mb-3">
          <label htmlFor="passwordAgainInput" className="form-label">
            Retype Password
          </label>
          <input
            ref={passwordAgainRef}
            type="password"
            className="form-control"
            id="passwordAgainInput"
            required
            aria-describedby="passwordAgainHelp"
          />
          <p className="form-text" id="passwordAgainHelp">
            Type your password again.
          </p>
        </div>
        <div className="mb-3 align-self-center text-danger">
          {error ? (<p>
            Unknown error. Please reload the page and try again.
          </p>) : null}
        </div>
        <div className="mb-3 align-self-center">
          <p>
            Already have an account? <a href="/login">Login</a> now!
          </p>
        </div>
        <div className="mb-3 align-self-center">
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
