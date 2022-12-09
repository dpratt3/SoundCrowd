import "./SongPage.css"
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllSongs } from "../../store/songs";
import { useParams } from "react-router-dom";
import { getTheSong, deleteTheSong } from "../../store/songs";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import LoginFormPage from "../LoginFormPage";
import SongForm from "../SongForm";


const SongPage = () => {
    const dispatch = useDispatch();
    const allSongs = useSelector((state) => Object.values(state.song));
    const oneSong = useSelector((state) => Object.values(state.song)[0]);
    const sessionUser = useSelector((state) => state.session.user);
    const { songId } = useParams();
    const history = useHistory();
    const [formStatus, setFormStatus] = useState(false);

    //console.log(allSongs, ` <------------------`) 
    const deleteSong = async (songId) => {
        await dispatch(deleteTheSong(songId)).then(() => history.push('/songs'))
        //history.push('/songs')
    };

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
            <div style={{ margin: 20, display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
                {allSongs && allSongs.length > 0 && allSongs.map((song) => {
                    return (
                        <div key={song.id} onClick={() => history.push(`/songs/${song.id}`)} style={{ flex: "1 0 0", marginTop: 20 }}>
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

export default SongPage;