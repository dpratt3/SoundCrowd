// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/auth/LoginFormPage";
import SignupFormPage from "./components/auth/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SongsPage from "./components/song/SongsPage";
import SingleSongPage from "./components/song/SingleSongPage"
import AlbumPage from "./components/album/AlbumsPage";
import SingleAlbumPage from "./components/album/SingleAlbumPage"
import MySongsPage from "./components/song/MySongsPage";
import Homepage from "./components/Homepage/Homepage"

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
          <Route exact path="/MySongs">
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
          <Route exact path="/">
            <Homepage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
