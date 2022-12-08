// frontend/src/components/LoginFormPage/index.js
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { Redirect } from "react-router-dom";
import './EditAlbumForm.css'
import { editTheAlbum, getTheAlbum } from "../../store/album";

// pass song in as prop
function EditAlbumForm({album}) {
  const {albumId} = useParams();
  const dispatch = useDispatch();

  //const sessionUser = useSelector((state) => state.session.user);
  const [title, setTitle] = useState(album.title);
  const [description, setDescription] = useState(album.description);
  const [url, setUrl] = useState(album.url);
  const [imageUrl, setImageUrl] = useState(album.imageUrl)
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const albumEdits = {
        title,
        description,
        imageUrl
        };

   const editedAlbum = await dispatch(editTheAlbum(albumEdits, albumId)).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );

    if(editedAlbum) dispatch(getTheAlbum(albumId));
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
        ImageUrl
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default EditAlbumForm;
