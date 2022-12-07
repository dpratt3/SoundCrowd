// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import './Navigation.css';

function DemoUserButton() {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);

  const demoUser = {credential: 'Demo-lition', password: 'password'} // must be object

  const demoUserLogin = (e) => {
    return dispatch(sessionActions.login(demoUser)).catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    };
  
  return (
    <>
    <button onClick={demoUserLogin}>Demo User</button>
    </>
  );
}

export default DemoUserButton;