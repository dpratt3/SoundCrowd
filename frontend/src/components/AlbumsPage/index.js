import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import {useSelector, useDispatch} from "react-redux";
import { getAllAlbums } from "../../store/album";
import { useParams } from "react-router-dom";
import { getTheSong, deleteTheSong } from "../../store/songs";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import LoginFormPage from "../LoginFormPage";
import CreateSongForm from "../CreateSongForm";


const AlbumPage = () => {
    const dispatch = useDispatch();
    const allAlbums = useSelector( (state) => Object.values(state.album) );
    const oneAlbum = useSelector((state) => Object.values(state.album)[0]);
    const sessionUser = useSelector((state) => state.session.user);
    const { songId } = useParams();
    const history = useHistory();
    const [formStatus, setFormStatus] = useState(false);

    //console.log(allSongs, ` <------------------`) 
    // const deleteSong = async (songId) => {
    //     await dispatch(deleteTheSong(songId)).then(() => history.push('/songs'))
    //     //history.push('/songs')
    // };
    
    useEffect(() => {
        dispatch(getAllAlbums())
    }, [dispatch])

    return (
        <> 
        <div>
            {allAlbums && allAlbums.length > 0 && allAlbums.map((album) => {
                return(
                    <div key={album.id}> 
                        <NavLink to={`/albums/${album.id}`}>
                            <div> 
                                {album.title}, {album.description}
                            </div>
                        </NavLink>
                    </div>
                )
            })}
        </div>
        {/* <div className="song-buttons">
                {(sessionUser?.id) && (
                    <button onClick={() => {
                        setFormStatus(!formStatus)
                        console.log(formStatus, ` <----------------- form status`)
                    }
                    }>Create Song</button>
                )}
                {(sessionUser?.id) && (formStatus) && (
                   <CreateSongForm song={oneSong}/>
                )}
                
            </div> */}
        </>
     );     
}
 
export default AlbumPage;