// const handleSubmit = (e) => {
//     e.preventDefault();
    
    // const newSong = {
    //     title, 
    //     description, 
    //     imageUrl, 
    //     url, 
    //     albumId 
    // };

//     dispatchEvent(writeSong(newSong));
//     reset();
// };
import "./HomePage.css"
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import {useSelector, useDispatch} from "react-redux";
import { getAllSongs } from "../../store/songs";

const HomePage = () => {
    const dispatch = useDispatch();
    const allSongs = useSelector( (state) => Object.values(state.song) );
    console.log(allSongs, ` <------------------`) 
    useEffect(() => {
        dispatch(getAllSongs())
    }, [dispatch])

    return ( 
        <div>
            { allSongs.map((song) => {
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
 
export default HomePage;