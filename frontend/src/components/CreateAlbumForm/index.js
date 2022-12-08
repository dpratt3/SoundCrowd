// frontend/src/components/LoginFormPage/index.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './CreateAlbumForm.css'
import { createTheAlbum } from "../../store/album";


const CreateAlbumForm = ({ setFormStatus, formStatus }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  
  const userId = sessionUser.id;
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [url, setUrl] = useState();
  const [imageUrl, setImageUrl] = useState()
  const [albumTitle, setAlbumTitle] = useState()
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
        //albumTitle
        };
    
  await dispatch(createTheAlbum(newAlbum)).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors){ setErrors(data.errors) };
      }
      );
      if(errors.length == 0) {
        setFormStatus(!formStatus)
      }
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
      {/* <label>
        Album Title
        <input
          type="text"
          value={albumTitle}
          onChange={(e) => setAlbumTitle(e.target.value)}
          required
        />
      </label> */}
      <button type="submit">Submit</button>
    </form>
  );
}

export default CreateAlbumForm;
