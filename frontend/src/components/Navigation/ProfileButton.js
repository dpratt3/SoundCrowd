// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import { useHistory } from "react-router-dom";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push("/")
  };

  return (
    <div style={{ position: "relative" }}>
      <button onClick={openMenu} style={{ backgroundColor: "#3333" }}>
        <i className="fas fa-user-circle" /> <span style={{ margin: "auto 4" }}>{user.username}</span>
      </button>
      {showMenu && (
        <div className="profile-dropdown" style={{ padding: 10,
                                                   color: "#fff", 
                                                   display: "flex", 
                                                   flexDirection: "column", 
                                                   position: "absolute", 
                                                   backgroundColor: "#333", 
                                                   width: 150, 
                                                   right: 0, 
                                                   top: 40, borderRadius: 4}}>
          <div>{user.email}</div>
          <hr style={{ width: "100%" }} />

          <div onClick={logout}>Log Out</div>

        </div>
      )}
    </div>
  );
}

export default ProfileButton;
