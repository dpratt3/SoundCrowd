
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import './CreateForm.css'
import { createTheSong } from "../../store/songs";
import { getAllAlbums } from "../../store/album";


function CreateSongForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const albumIds = useSelector((state) => Object.values(state.album).filter(album => album.userId == sessionUser.id).map(album => album.id));
  const userId = sessionUser.id;
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [url, setUrl] = useState();
  const [imageUrl, setImageUrl] = useState()
  const [albumId, setAlbumId] = useState()
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    dispatch(getAllAlbums())
  }, [dispatch])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const newSong = {
      userId,
      title,
      description,
      url,
      imageUrl,
      albumId: Number(albumId)
    };

  
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
        <select 
          name="albumId" 
          onChange={(e) => setAlbumId(e.target.value)} 
          required >
            {albumIds.map(albumId => <option key={albumId} value={albumId}>{albumId}</option>)}
        </select>
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default CreateSongForm;
