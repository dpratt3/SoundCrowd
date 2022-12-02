import "./SingleSong.css"
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getTheSong } from "../../store/songs";


const SongDetail = () => {
    const dispatch = useDispatch();
    const {songId} = useParams();   

    const oneSong = useSelector( (state) => Object.values(state.song)[0] );

    useEffect(() => {
        dispatch(getTheSong(songId));
    }, [dispatch, songId])

    console.log("hello world", songId, ` <--------------------------`)

    return ( 
            <div> 
                <NavLink key={oneSong.id} to={`/songs/${oneSong.id}`}>
                    <div> 
                        {oneSong.title}, {oneSong.description}
                    </div>
                </NavLink>
                <button>Delete Song</button>
            </div>
     );
}
 
export default SongDetail;