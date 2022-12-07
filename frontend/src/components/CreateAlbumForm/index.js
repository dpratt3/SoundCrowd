// frontend/src/components/LoginFormPage/index.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './CreateAlbumForm.css'
import { createTheAlbum } from "../../store/album";


function CreateAlbumForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  
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

    const newAlbum = {
        userId,
        title,
        description,
        url,
        imageUrl,
        albumId: null
        };
    
  await dispatch(createTheAlbum(newAlbum)).catch(
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

export default CreateAlbumForm;
