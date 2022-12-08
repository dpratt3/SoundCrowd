// frontend/src/components/Navigation/index.js
import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import DemoUserButton from "./DemoUserButton"
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div style={{
        position: "relative",
        display: "flex",
      justifyContent: "space-between", alignItems: 'center', textAlign: "center"}}>
        <img src="/favicon.ico" style={{width: 40}}></img>
        <NavLink style={{color: "#fff", textDecoration: "none"}} exact to="/">Home </NavLink>
        <NavLink style={{color: "#fff", textDecoration: "none"}} to="/songs">Songs </NavLink>
        <NavLink style={{color: "#fff", textDecoration: "none"}} to="/albums">Albums </NavLink>
        <NavLink style={{color: "#fff", textDecoration: "none"}} to="/my-songs">My-Songs </NavLink>
        <div style={{position: "relative"}}>
        <ProfileButton style={{ position: "absolute", backgroundColor: "#333", color: "#fff", textDecoration: "none", display: "block"}} user={sessionUser} />
        </div>
      </div>
    );
  } else {
    sessionLinks = (
      <div style={{display: "flex",
      justifyContent: "space-between",alignItems: "center", textAlign: "center"}}>
        <img src="/favicon.ico" style={{width: 40}}></img>
        <NavLink style={{color: "#fff", textDecoration: "none"}} exact to="/">Home </NavLink>
        <NavLink to="/login">Log In </NavLink>
        <NavLink to="/signup">Sign Up </NavLink>
        <NavLink to="/songs">Songs </NavLink>
        <DemoUserButton />
        </div>
    );
  }

  return (
    <div style={{backgroundColor: "#333",}}>
        {isLoaded && sessionLinks}
    </div>
  );
}

export default Navigation;
