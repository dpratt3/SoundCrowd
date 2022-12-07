import "./SingleSong.css"
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getTheSong, deleteTheSong } from "../../store/songs";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import LoginFormPage from "../LoginFormPage";
import EditSongForm from "../EditSongForm";


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
        //history.push('/songs')
    };

    const editSong = async (songId) => {
        await dispatch(deleteTheSong(songId)).then(() => history.push('/songs'))
        //history.push('/songs')
    };

    //console.log("hello world", songId, ` <--------------------------`)

    //console.log(oneSong.userId, sessionUser.id, ` <----------------------------`) //breaks if not logged in

    //show edit form react state (conditional rendering)

    const [formStatus, setFormStatus] = useState(false);

    if (!(oneSong && oneSong.id)) return null

    return (
        <>
            <div>
                <NavLink key={oneSong.id} to={`/songs/${oneSong.id}`}>
                    <div>
                        {oneSong.title}, {oneSong.description}
                    </div>
                </NavLink>
            </div>
            <div className="song-buttons">
                {console.log(oneSong , sessionUser,oneSong.userId && sessionUser?.id && oneSong.userId === sessionUser?.id)}
                {(oneSong.userId && sessionUser?.id && oneSong.userId === sessionUser?.id) && (
                    <button onClick={() => deleteSong(songId)}>Delete</button>
                )}
                {(oneSong.userId && sessionUser?.id  && oneSong.userId === sessionUser?.id) && (
                    <button onClick={() => {
                        setFormStatus(!formStatus)
                        console.log(formStatus, ` <----------------- form status`)
                    }
                    }>Edit</button>
                )}
                {(oneSong.userId && sessionUser?.id && oneSong.userId === sessionUser?.id) && (formStatus) && (
                   <EditSongForm song={oneSong}/>
                )}
                
            </div>
        </>
    );
}

export default SongDetail;