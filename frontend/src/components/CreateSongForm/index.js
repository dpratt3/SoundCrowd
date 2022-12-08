
import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import './CreateForm.css'
import { createTheSong } from "../../store/songs";
import { getAllAlbums } from "../../store/album";


const CreateSongForm = ({ setFormStatus, formStatus }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const albumIds = useSelector((state) => Object.values(state.album).filter(album => album.userId == sessionUser.id).map(album => album.title));
  const userId = sessionUser.id;
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [url, setUrl] = useState();
  const [imageUrl, setImageUrl] = useState()
  const [albumId, setAlbumId] = useState()
  const [errors, setErrors] = useState([]);
  const history = useHistory();

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
        if (data && data.errors) { setErrors(data.errors) }
      }
    );
    if (errors.length == 0) {

      setFormStatus(!formStatus)
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 300 }}>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
     <div className="form-item">
        <label>
          Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="form-item">
        <label>
          Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

     <div className="form-item">
        <label>
          Url
        </label>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
      </div>

     <div className="form-item">
        <label>
          ImageUrl
        </label>
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />
      </div>

     <div className="form-item">
        <label>
          AlbumId
        </label>
       
        <select
          name="albumId"
          onChange={(e) => setAlbumId(e.target.value)}
          required >
          {albumIds.map(albumId => <option key={albumId} value={albumId}>{albumId}</option>)}
        </select>
        
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default CreateSongForm;
