import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './AlbumForm.css'
import { createTheAlbum } from "../../../store/album";
import { editTheAlbum, getTheAlbum } from "../../../store/album";
import { useParams } from "react-router-dom";


const AlbumForm = ({ album, setFormStatus, formStatus }) => {
  const { albumId } = useParams();

  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const userId = sessionUser.id;
  const [title, setTitle] = useState(album?.title);
  const [description, setDescription] = useState(album?.description);
  const [imageUrl, setImageUrl] = useState(album?.imageUrl)
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);


    if (album) {
      const albumEdits = {
        title,
        description,
        imageUrl
      };
      const editedAlbum = await dispatch(editTheAlbum(albumEdits, albumId)).catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(Object.keys(data.errors).map(key => data.errors[key]));
          }
        }
      );

      if (editedAlbum) dispatch(getTheAlbum(albumId));
    } else {
      const newAlbum = {
        userId,
        title,
        description,
        imageUrl,
      };

      await dispatch(createTheAlbum(newAlbum)).catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(Object.keys(data.errors).map(key => data.errors[key]));
          }
        }
      );

    }
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
          Description
        </label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
      <button type="submit">{album ? "Update" : "Create"}</button>
    </form>
  );
}

export default AlbumForm;
