// frontend/src/components/LoginFormPage/index.js
import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import "./LoginForm.css";

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    const errors = [];
    if (!credential.length) errors.push("Please enter your username or email.");
    if (!password.length) errors.push("Please provide a valid password.");
    setValidationErrors(errors);
  }, [credential, password]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();

    setHasSubmitted(true);
    if (validationErrors.length) return alert(`Cannot Submit`);

    setValidationErrors([]);

    const formInfo = {
      credential,
      password,
    };

    console.log(formInfo);
    setCredential("");
    setPassword("");
    setHasSubmitted(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <ul>
        {validationErrors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <label>
        Username or Email
        <input
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />
      </label>
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit">Log In</button>
    </form>
  );
}

export default LoginFormPage;
