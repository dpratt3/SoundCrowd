import "./SingleSong.css"
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getTheSong, deleteTheSong } from "../../store/songs";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import SongForm from "../SongForm";


const SongDetail = () => {
    const dispatch = useDispatch();
    const { songId } = useParams();
    const history = useHistory();

    const oneSong = useSelector((state) => state.song[songId]);
    const sessionUser = useSelector((state) => state.session.user);

    useEffect(() => {
        dispatch(getTheSong(songId));
    }, [dispatch, songId])

    const deleteSong = async (songId) => {
        await dispatch(deleteTheSong(songId)).then(() => history.push('/songs'))
    };

    const [formStatus, setFormStatus] = useState(false);

    if (!(oneSong && oneSong.id)) return null

    return (
        <div style={{ margin: 20 }}>
            <div >
                <div style={{ color: "black" }}>
                    <h2>{oneSong.title}</h2>
                    <p>{oneSong.description}</p>
                </div>
            </div>
            <div>
                <img src={oneSong.imageUrl} style={{ maxWidth: 500, borderRadius: 4 }}></img>
            </div>
            <div style={{ display: "flex", alignItems: "center", marginTop: 4 }}>
                <audio controls>
                    <source src={oneSong.url}></source>
                </audio>
                {(oneSong.userId && sessionUser?.id && oneSong.userId === sessionUser?.id) && (
                    <button style={{ margin: 4, backgroundColor: "#a32b2b" }} onClick={() => setFormStatus(!formStatus)}>Edit</button>
                )}


                {(!formStatus && oneSong.userId && sessionUser?.id && oneSong.userId === sessionUser?.id) && (
                    <button style={{ margin: 4, backgroundColor: "#a32b2b" }} className="button" onClick={() => deleteSong(songId)}>Delete</button>
                )}
            </div>
            <div style={{ marginTop: 8 }}>
                {(oneSong.userId && sessionUser?.id && oneSong.userId === sessionUser?.id) && (formStatus) && (
                    <SongForm song={oneSong} setFormStatus={setFormStatus} formStatus={formStatus} />
                )}
            </div>

        </div>
    );
}

export default SongDetail;