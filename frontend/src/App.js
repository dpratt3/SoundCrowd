// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SongsPage from "./components/SongsPage";
import SingleSongPage from "./components/SingleSongPage"
import AlbumPage from "./components/AlbumsPage";
import SingleAlbumPage from "./components/SingleAlbumPage"
import MySongsPage from "./components/MySongsPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path='/songs/:songId/edit'>
            <SingleSongPage />
          </Route>
          <Route exact path="/my-songs">
            <MySongsPage />
          </Route>
          <Route exact path="/songs">
            <SongsPage />
          </Route>
          <Route path="/albums/:albumId">
            <SingleAlbumPage />
          </Route>
          <Route exact path="/albums">
            <AlbumPage />
          </Route>
          <Route path='/songs/:songId'>
            <SingleSongPage />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
