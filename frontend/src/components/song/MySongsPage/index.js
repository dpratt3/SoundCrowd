import "./MySongsPage.css"
import { useEffect } from "react";
import {useSelector, useDispatch} from "react-redux";
import { getAllSongs } from "../../../store/songs";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import SongForm from "../SongForm";

const MySongsPage = () => {
    const sessionUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const allSongs = useSelector( (state) => Object.values(state.song).filter(song => song.userId == sessionUser.id));
    const history = useHistory();
    const [formStatus, setFormStatus] = useState(false);
    
    useEffect(() => {
        dispatch(getAllSongs())
    }, [dispatch])

    return (
        <>
            <div style={{ margin: 20}}>
                <div>
                    {(sessionUser?.id) && (
                        <button style={{marginBottom: 8, backgroundColor: "#a32b2b"}} onClick={() => {
                            setFormStatus(!formStatus)
                        }
                        }>Create Song</button>
                    )}
                    {(sessionUser?.id) && (formStatus) && (
                        <SongForm setFormStatus={setFormStatus} formStatus={formStatus} />
                    )}

                </div>
            </div>
            <div style={{ margin: 20, display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>
                {allSongs && allSongs.length > 0 && allSongs.map((song) => {
                    return (
                        <div key={song.id} onClick={() => history.push(`/songs/${song.id}`)} style={{ flex: "1 0 0 1", marginTop: 20 }}>
                            <img src={song.imageUrl} style={{ width: 200, height: 200 }}></img>

                            <div style={{ fontSize: 12, fontWeight: "bold", fontFamily: "Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif" }}>
                                {song.title}
                            </div>
                            <div style={{ fontSize: 10, fontWeight: "bold", fontFamily: "Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif" }}>
                                {song.description}
                            </div>
                        </div>
                    )
                })}
            </div>

        </>
     );     
}
 
export default MySongsPage;