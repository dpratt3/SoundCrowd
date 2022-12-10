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
        <div style={{display: "flex", alignItems: "center", justifyContent: 'center' , color: "#fff", fontWeight: "bold"}}>
        <img src="/favicon.ico" style={{width: 40}} alt="favicon placeholder"></img>
        <p>SoundCrowd</p>
        </div>
        <NavLink activeClassName="active-nav" className="nav-link" exact to="/">Home </NavLink>
        <NavLink activeClassName="active-nav" className="nav-link" to="/songs">Songs </NavLink>
        <NavLink activeClassName="active-nav" className="nav-link" to="/albums">Albums </NavLink>
        <NavLink activeClassName="active-nav" className="nav-link" to="/my-songs">My-Songs </NavLink>
        <div style={{position: "relative"}}>
        <ProfileButton style={{ position: "absolute", backgroundColor: "#333", color: "#fff", textDecoration: "none", display: "block"}} user={sessionUser} />
        </div>
      </div>
    );
  } else {
    sessionLinks = (
      <div style={{display: "flex", justifyContent: "space-between",alignItems: "center", textAlign: "center"}}>
       <div style={{display: "flex", alignItems: "center", justifyContent: 'center' , color: "#fff", fontWeight: "bold"}}>
        <img src="/favicon.ico" style={{width: 40}} alt="favicon placeholder"></img>
        <p>SoundCrowd</p>
        </div>
        <NavLink activeClassName="active-nav" className="nav-link" exact to="/">Home </NavLink>
        <NavLink activeClassName="active-nav" className="nav-link" to="/login">Log In </NavLink>
        <NavLink activeClassName="active-nav" className="nav-link" to="/signup">Sign Up </NavLink>
        <NavLink activeClassName="active-nav" className="nav-link" to="/songs">Songs </NavLink>
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
