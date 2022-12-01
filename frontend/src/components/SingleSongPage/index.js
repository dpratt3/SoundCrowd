import "./SingleSong.css"
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getTheSong } from "../../store/songs";


const SongDetail = () => {
    const dispatch = useDispatch();
    const {songId} = useParams();
    //console.log("hello world", songId, ` <--------------------------`)

    useEffect(() => {
        dispatch(getTheSong());
    }, [songId])


}
 
export default SongDetail;