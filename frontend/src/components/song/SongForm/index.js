
import React, { useState, useEffect } from "react";
import { useParams} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import './CreateForm.css'
import { createTheSong } from "../../../store/songs";
import { getAllAlbums } from "../../../store/album";
import { editTheSong, getTheSong } from "../../../store/songs";


const SongForm = ({ song, setFormStatus, formStatus }) => {
  const dispatch = useDispatch();
  const { songId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const albums = useSelector((state) => Object.values(state.album).filter(album => album.userId === sessionUser.id));
  const userId = sessionUser.id;


  const [title, setTitle] = useState(song?.title);
  const [description, setDescription] = useState(song?.description);
  const [url, setUrl] = useState(song?.url);
  const [imageUrl, setImageUrl] = useState(song?.imageUrl)
  const [albumId, setAlbumId] = useState(null)

  const [errors, setErrors] = useState([]);

  useEffect(() => {
    dispatch(getAllAlbums())
  }, [dispatch])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const albumIdInt = albums.find(album => album.title === albumId)?.id
    console.log(albumIdInt, ` <-------------------------- albumIdInt`)
    if (song) {
      const songEdits = {
        title,
        description,
        url,
        imageUrl
      };
      const editedSong = await dispatch(editTheSong(songEdits, songId)).catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(Object.keys(data.errors).map(key => data.errors[key]));
          }
        }
      );

      if (editedSong) {
        setFormStatus(!formStatus);
        dispatch(getTheSong(songId));
      }

    } else {
      const newSong = {
        userId,
        title,
        description,
        url,
        imageUrl,
        albumId: albumIdInt || null
      };

      await dispatch(createTheSong(newSong)).catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(Object.keys(data.errors).map(key => data.errors[key]));
          }
        }
      );
      if (errors.length === 0) {

        setFormStatus(!formStatus)
      }
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
          Song URL
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
          Image Url
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
          Album Title
        </label>

        <select
          name="albumId"
          onChange={(e) => setAlbumId(e.target.value)}
          required >
            <option selected value={null}>{"no album"}</option>
          {albums.map(album => <option key={album.albumId} value={album.albumId}>{album.title}</option>)}
        </select>

      </div>
      <button type="submit">{song ? "Update" : "Create"}</button>
    </form>
  );
}

export default SongForm;
