// this comment might allow merging of the dev-alt branch
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getTheAlbum, deleteTheAlbum } from "../../../store/album";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import EditAlbumForm from "../EditAlbumForm";

const AlbumDetail = () => {
    const dispatch = useDispatch();
    const { albumId } = useParams();
    const history = useHistory();

    const oneAlbum = useSelector((state) => state.album[albumId]);
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

        <>
            <div>
                <NavLink key={oneAlbum.id} to={`/albums/${oneAlbum.id}`}>
                    <div>
                        {oneAlbum.title}, {oneAlbum.description}
                    </div>
                </NavLink>
            </div>
            <div className="album-buttons">
                {(oneAlbum.userId === sessionUser?.id) && (
                    <button onClick={() => deleteAlbum(albumId)}>Delete</button>
                )}
                {(oneAlbum.userId === sessionUser?.id) && (
                    <button onClick={() => {
                        setFormStatus(!formStatus)
                    }
                    }>Edit</button>
                )}
                {(oneAlbum.userId === sessionUser?.id) && (formStatus) && (
                    <EditAlbumForm album={oneAlbum} />
                )}

            </div>
        </>
    );
}

export default AlbumDetail;
