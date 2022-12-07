import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllAlbums } from "../../store/album";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import LoginFormPage from "../LoginFormPage";
import CreateAlbumForm from "../CreateAlbumForm";


const AlbumPage = () => {
    const dispatch = useDispatch();
    const allAlbums = useSelector((state) => Object.values(state.album));
    const sessionUser = useSelector((state) => state.session.user);
    const [formStatus, setFormStatus] = useState(false);

    useEffect(() => {
        dispatch(getAllAlbums())
    }, [dispatch])

    return (
        <>
            <div>
                {allAlbums && allAlbums.length > 0 && allAlbums.map((album) => {
                    return (
                        <div key={album.id}>
                            <NavLink to={`/albums/${album.id}`}>
                                <div>
                                    {album.title}, {album.description}
                                </div>
                            </NavLink>
                        </div>
                    )
                })}
            </div>
            <div className="song-buttons">
                {(sessionUser?.id) && (
                    <button onClick={() => setFormStatus(!formStatus)}>Create Album</button>
                )}
                {(sessionUser?.id) && (formStatus) && (
                    <CreateAlbumForm />
                )}

            </div>
        </>
    );
}

export default AlbumPage;