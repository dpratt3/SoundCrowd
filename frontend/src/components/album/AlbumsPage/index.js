import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllAlbums } from '../../../store/album'
import { useHistory } from "react-router-dom";
import { useState } from "react";
import AlbumForm from "../AlbumForm";


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
                    <button style={{marginBottom: 8, backgroundColor: "#ff5614"}} onClick={() => setFormStatus(!formStatus)}>Create Album</button>
                )}
                {(sessionUser?.id) && (formStatus) && (
                    <AlbumForm setFormStatus={setFormStatus} formStatus={formStatus} />
                )}

            </div>
            <div className="grid">
                {allAlbums && allAlbums.length > 0 && allAlbums.map((album) => {
                    return (
                        <div key={album.id} className="gridtab" onClick={() => history.push(`/albums/${album.id}`)} >
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