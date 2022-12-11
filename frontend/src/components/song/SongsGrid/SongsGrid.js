import { useHistory } from "react-router-dom";
import "./SongsGrid.css";

const SongsGrid = ({songs, desc}) => {
    const history = useHistory();
    return (
    
        <div className="grid">
                {songs && songs.length > 0 && songs.map((song) => {
                    if(desc){
                    return (
                        <div key={song.id} className="gridtab" onClick={() => history.push(`/songs/${song.id}`)} >
                            <img src={song.imageUrl} type="link" className="song-image"></img>

                            <div style={{ fontSize: 12, fontWeight: "bold", fontFamily: "Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif" }}>
                                {song.title}
                            </div>
                            <div style={{ fontSize: 10, fontWeight: "bold", fontFamily: "Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif" }}>
                                {song.description}
                            </div>
                        </div>
                    )
                } else {
                    return (
                        <div key={song.id} className="gridtab" onClick={() => history.push(`/songs/${song.id}`)} >
                            <img src={song.imageUrl} type="link" className="song-image"></img>

                            <div style={{ fontSize: 12, fontWeight: "bold", fontFamily: "Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif" }}>
                                {song.title}
                            </div>
                            {/* <div style={{ fontSize: 10, fontWeight: "bold", fontFamily: "Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif" }}>
                                {song.description}
                            </div> */}
                        </div>
                    )
                }
                })}
            </div>
    )
}

export default SongsGrid;