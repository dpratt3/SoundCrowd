// this comment might allow merging of the dev-alt branch
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getTheAlbum, deleteTheAlbum } from "../../store/album";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import LoginFormPage from "../LoginFormPage";

const AlbumDetail = () => {
    const dispatch = useDispatch();
    const { albumId } = useParams();
    const history = useHistory();

    const onealbum = useSelector((state) => state.album[albumId]);
    const sessionUser = useSelector((state) => state.session.user);

    useEffect(() => {
        dispatch(getTheAlbum(albumId));
    }, [dispatch, albumId])

    const deleteAlbum = async (albumId) => {
        await dispatch(deleteTheAlbum(albumId)).then(() => history.push('/albums'))
        //history.push('/albums')
    };

    // const editalbum = async (albumId) => {
    //     await dispatch(deleteThealbum(albumId)).then(() => history.push('/albums'))
    //     //history.push('/albums')
    // };

    //console.log("hello world", albumId, ` <--------------------------`)

    //console.log(onealbum.userId, sessionUser.id, ` <----------------------------`) //breaks if not logged in

    //show edit form react state (conditional rendering)

    const [formStatus, setFormStatus] = useState(false);

    if (!(onealbum && onealbum.id)) return null
    console.log(onealbum)
    return (
        
        <>
            <div>
                <NavLink key={onealbum.id} to={`/albums/${onealbum.id}`}>
                    <div>
                        {onealbum.title}, {onealbum.description}
                    </div>
                </NavLink>
            </div>
            <div className="album-buttons">
                {(onealbum.userId === sessionUser?.id) && (
                    <button onClick={() => deleteAlbum(albumId)}>Delete</button>
                )}
                {/* {(onealbum.userId === sessionUser?.id) && (
                    <button onClick={() => {
                        setFormStatus(!formStatus)
                        console.log(formStatus, ` <----------------- form status`)
                    }
                    }>Edit</button>
                )}
                {(onealbum.userId === sessionUser?.id) && (formStatus) && (
                    //<h1>you clicked me</h1>
                    //<Redirect to=`/albums/${onealbum.id`/>
                   //history.push(`/albums/${onealbum.id}/edit`)
                   <EditalbumForm album={onealbum}/>
                )} */}
                
            </div>
        </>
    );
}

export default AlbumDetail;
