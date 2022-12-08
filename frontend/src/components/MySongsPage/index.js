import "./MySongsPage.css"
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import {useSelector, useDispatch} from "react-redux";
import { getAllSongs } from "../../store/songs";
import { useParams } from "react-router-dom";
import { getTheSong, deleteTheSong } from "../../store/songs";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import LoginFormPage from "../LoginFormPage";
import CreateSongForm from "../CreateSongForm";

const MySongsPage = () => {
    const sessionUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const allSongs = useSelector( (state) => Object.values(state.song).filter(song => song.userId == sessionUser.id));
    const oneSong = useSelector((state) => Object.values(state.song)[0]);
    
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
        <div>
            {allSongs && allSongs.length > 0 && allSongs.map((song) => {
                return(
                    <div key={song.id}> 
                        <NavLink to={`/songs/${song.id}`}>
                            <div> 
                                {song.title}, {song.description}
                            </div>
                        </NavLink>
                    </div>
                )
            })}
        </div>
        <div className="song-buttons">
                {(sessionUser?.id) && (
                    <button onClick={() => {
                        setFormStatus(!formStatus)
                        console.log(formStatus, ` <----------------- form status`)
                    }
                    }>Create Song</button>
                )}
                {(sessionUser?.id) && (formStatus) && (
                   <CreateSongForm setFormStatus={setFormStatus} formStatus={formStatus}/>
                )}
                
            </div>
        </>
     );     
}
 
export default MySongsPage;