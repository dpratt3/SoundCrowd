import "./SongPage.css"
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllSongs } from "../../../store/songs";
import { useParams } from "react-router-dom";
import {  deleteTheSong } from "../../../store/songs";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import SongForm from "../SongForm";
import SongsGrid from "../SongsGrid/SongsGrid";


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
                        <button style={{marginBottom: 8, backgroundColor: "#ff5614"}} onClick={() => {
                            setFormStatus(!formStatus)
                        }
                        }>Create Song</button>
                    )}
                    {(sessionUser?.id) && (formStatus) && (
                        <SongForm setFormStatus={setFormStatus} formStatus={formStatus} />
                    )}

                </div>
            </div>
            <SongsGrid songs={allSongs}></SongsGrid>
          

        </>
    );
}

export default SongPage;