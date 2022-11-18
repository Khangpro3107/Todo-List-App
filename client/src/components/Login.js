import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// const URL = process.env.REACT_APP_BACKEND_URL;
const URL = "https://todolist-api.onrender.com/";

const Login = () => {
  const navigate = useNavigate();

  const usernameRef = useRef();
  const passwordRef = useRef();

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${URL}login`, {
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      });
      if (!res.data.result)
        return alert("Invalid login credentials. Please try again.");
      alert(`Login successful! Welcome, ${usernameRef.current.value}.`);
      localStorage.setItem("username", usernameRef.current.value);
      navigate("/");
      return window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container w-50 shadow p-3 mb-5 bg-body rounded">
      <form
        className="d-flex flex-column"
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
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
          />
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
          />
        </div>
        <div className="mb-3 align-self-center">
          <p>
            Don't have an account? <a href="/register">Register</a> now!
          </p>
        </div>
        <div className="mb-3 align-self-center">
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
