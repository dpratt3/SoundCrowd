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
    const history = useHistory();

    useEffect(() => {
        dispatch(getAllAlbums())
    }, [dispatch])

    return (
        <>
            <div style={{ margin: 20}}>
                {(sessionUser?.id) && (
                    <button style={{marginBottom: 8, backgroundColor: "#a32b2b"}} onClick={() => setFormStatus(!formStatus)}>Create Album</button>
                )}
                {(sessionUser?.id) && (formStatus) && (
                    <CreateAlbumForm setFormStatus={setFormStatus} formStatus={formStatus} />
                )}

            </div>
            <div style={{ margin: 20, display: "flex", flexWrap: "wrap", justifyContent: "space-between" }} >
                {allAlbums && allAlbums.length > 0 && allAlbums.map((album) => {
                    return (
                        <div key={album.id} onClick={() => history.push(`/albums/${album.id}`)}  style={{ flex: "1 0 0", marginTop: 20 }}>
                            <img src={album.imageUrl} style={{ width: 200, height: 200 }}></img>
                                <div style={{ fontSize: 12, fontWeight: "bold", fontFamily: "Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif" }}>
                                    {album.title}
                                </div>
                                <div style={{ fontSize: 10, fontWeight: "bold", fontFamily: "Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif" }}>
                                    {album.description}
                                </div>
                        </div>
                    )
                })}
            </div>
        </>
    );
}

export default AlbumPage;