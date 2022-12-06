import "./SongPage.css"
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllSongs } from "../../store/songs";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { getTheSong, deleteTheSong } from "../../store/songs";
import { useState } from "react";
import CreateSongForm from "../CreateSongForm";

const SongPage = () => {
    const dispatch = useDispatch();
    const allSongs = useSelector( (state) => Object.values(state.song) );

    //console.log(allSongs, ` <------------------`) 
    
    useEffect(() => {
        dispatch(getAllSongs())
    }, [dispatch])

    const { songId } = useParams();
    const history = useHistory();

    const oneSong = useSelector((state) => Object.values(state.song)[0]);
    const sessionUser = useSelector((state) => state.session.user);

    useEffect(() => {
        dispatch(getTheSong(songId));
    }, [dispatch, songId])


    const createSong = async (songId) => {
        await dispatch(deleteTheSong(songId)).then(() => history.push('/songs'))
        //history.push('/songs')
    };

    //console.log("hello world", songId, ` <--------------------------`)

    //console.log(oneSong.userId, sessionUser.id, ` <----------------------------`) //breaks if not logged in

    //show edit form react state (conditional rendering)

    const [formStatus, setFormStatus] = useState(false);

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
                {(oneSong.userId === sessionUser?.id) && (
                    <button onClick={() => {
                        setFormStatus(!formStatus)
                        console.log(formStatus, ` <----------------- form status`)
                    }
                    }>Create Song</button>
                )}
                {(oneSong.userId === sessionUser?.id) && (formStatus) && (
                    //<h1>you clicked me</h1>
                    //<Redirect to=`/songs/${oneSong.id`/>
                   //history.push(`/songs/${oneSong.id}/edit`)
                   <CreateSongForm song={oneSong}/>
                )}
                
            </div>
    </> 
     );
}
 
export default SongPage;