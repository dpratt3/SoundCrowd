import "./SingleSong.css"
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getTheSong, deleteTheSong } from "../../store/songs";
import { useHistory } from "react-router-dom";


const SongDetail = () => {
    const dispatch = useDispatch();
    const {songId} = useParams();
    const history = useHistory();   

    const oneSong = useSelector( (state) => Object.values(state.song)[0] );
    const sessionUser = useSelector( (state) => state.session.user);

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
    
    //console.log(oneSong.userId, sessionUser.id, ` <----------------------------`) //breaks if not logged in!
    if(!(oneSong && oneSong.id)) return null
    
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
                    {(oneSong.userId === sessionUser?.id) && (
                    <button onClick={() => deleteSong(songId)}>Delete</button>
                )}
                {(oneSong.userId === sessionUser?.id) && (
                    <button onClick={() => editSong(songId)}>Edit</button>
                )}
                </div>
            </> 
     );
}
 
export default SongDetail;