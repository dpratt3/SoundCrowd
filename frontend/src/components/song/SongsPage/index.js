import "./SongPage.css"
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllSongs } from "../../../store/songs";
import { useState } from "react";
import SongForm from "../SongForm";
import SongsGrid from "../SongsGrid/SongsGrid";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons'



const SongPage = () => {
    const dispatch = useDispatch();
    const allSongs = useSelector((state) => Object.values(state.song));
    const sessionUser = useSelector((state) => state.session.user);
    const [formStatus, setFormStatus] = useState(false);

    useEffect(() => {
        dispatch(getAllSongs())
    }, [dispatch])

    return (
        <>
            <div style={{ margin: 20 }}>
                <div>

                    {(sessionUser?.id) && (
                        <button style={{ marginBottom: 8, backgroundColor: "#ff5614", fontSize: 16 }} onClick={() => {
                            setFormStatus(!formStatus)
                        }}>
                            <FontAwesomeIcon icon={faFolderPlus} /> <span style={{ margin: "auto 8px" }}>Create Song </span></button>
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