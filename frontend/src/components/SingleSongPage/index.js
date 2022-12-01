import "./SingleSong.css"
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getTheSong } from "../../store/songs";


const SongDetail = () => {
    const dispatch = useDispatch();
    const {songId} = useParams();   

    const oneSong = useSelector( (state) => Object.values(state.song) );

    useEffect(() => {
        dispatch(getTheSong(songId));
    }, [dispatch, songId])

    console.log("hello world", songId, ` <--------------------------`)

    return ( 
        <div>
            { oneSong.map((song) => {
                return(
                    <div> 
                        <NavLink key={song.id} to={`/songs/${song.id}`}>
                            <div> 
                                {song.title}, {song.description}
                            </div>
                        </NavLink>
                    </div>
                )
            })}
        </div>
     );
}
 
export default SongDetail;