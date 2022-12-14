import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getTheAlbum, deleteTheAlbum } from "../../../store/album";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import AlbumForm from "../AlbumForm";
import SongsGrid from "../../song/SongsGrid/SongsGrid"

const AlbumDetail = () => {
    const dispatch = useDispatch();
    const { albumId } = useParams();
    const history = useHistory();

    const oneAlbum = useSelector((state) => state.album[albumId]);
    const albumSongs = oneAlbum?.Songs
    const sessionUser = useSelector((state) => state.session.user);

    useEffect(() => {
        dispatch(getTheAlbum(albumId));
    }, [dispatch, albumId])

    const deleteAlbum = async (albumId) => {
        await dispatch(deleteTheAlbum(albumId)).then(() => history.push('/albums'))

    };

    const [formStatus, setFormStatus] = useState(false);

    if (!(oneAlbum && oneAlbum.id)) return null

    return (

        <div style={{ margin: 20 }}>
            <div >
                <div style={{ color: "black" }}>
                    <h2>{oneAlbum.title}</h2>
                    <p>{oneAlbum.description}</p>
                </div>
            </div>
            <div>
                <img src={oneAlbum.imageUrl} style={{ maxWidth: 300, borderRadius: 4 }} alt="description of image"></img>
            </div>
            <div style={{ display: "flex", alignItems: "center", marginTop: 4 }}>
                {(oneAlbum.userId && sessionUser?.id && oneAlbum.userId === sessionUser?.id) && (
                    <button style={{ margin: 4, backgroundColor: "#ff5614" }} onClick={() => setFormStatus(!formStatus)}>Edit</button>
                )}


                {(!formStatus && oneAlbum.userId && sessionUser?.id && oneAlbum.userId === sessionUser?.id) && (
                    <button style={{ margin: 4, backgroundColor: "#ff5614" }} className="button" onClick={() => deleteAlbum(albumId)}>Delete</button>
                )}
            </div>
            <div style={{ marginTop: 8 }}>
                {(oneAlbum.userId && sessionUser?.id && oneAlbum.userId === sessionUser?.id) && (formStatus) && (
                    <AlbumForm album={oneAlbum} setFormStatus={setFormStatus} formStatus={formStatus} />
                )}
            </div>

            <hr />
            <div>
                <h2>Songs</h2>
                <SongsGrid songs={albumSongs}/> 
            </div>

        </div>

    );
}

export default AlbumDetail;
