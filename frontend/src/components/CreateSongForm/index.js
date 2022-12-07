// frontend/src/components/LoginFormPage/index.js
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { Redirect } from "react-router-dom";
import './CreateForm.css'
import { createTheSong } from "../../store/songs";


// pass song in as prop
function CreateSongForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  
  //console.log(sessionUser.id, ` <----------------- session user from create song form`)
  const userId = sessionUser.id;
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [url, setUrl] = useState();
  const [imageUrl, setImageUrl] = useState()
  const [albumId, setAlbumId] = useState()
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const newSong = {
        userId,
        title,
        description,
        url,
        imageUrl,
        albumId: null
        };
    
  console.log(newSong, ` <------------ This is the song that we want to write to the DB`)
  await dispatch(createTheSong(newSong)).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <label>
        Title
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>
      <label>
        Description
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </label>
      <label>
        Url
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
      </label>
      <label>
        ImageUrl
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />
      </label>
      <label>
        AlbumId
        <input
          type="text"
          value={albumId}
          onChange={(e) => setAlbumId(e.target.value)}
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default CreateSongForm;
