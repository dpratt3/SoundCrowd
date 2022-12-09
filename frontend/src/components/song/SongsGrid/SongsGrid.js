import { useHistory } from "react-router-dom";

const SongsGrid = ({songs}) => {
    const history = useHistory();
    return (
        <div style={{ margin: 20, display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>
                {songs && songs.length > 0 && songs.map((song) => {
                    return (
                        <div key={song.id} onClick={() => history.push(`/songs/${song.id}`)} style={{ flex: "1 0 0 1", marginTop: 20 }}>
                            <img src={song.imageUrl} style={{ width: 200, height: 200 }}></img>

                            <div style={{ fontSize: 12, fontWeight: "bold", fontFamily: "Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif" }}>
                                {song.title}
                            </div>
                            <div style={{ fontSize: 10, fontWeight: "bold", fontFamily: "Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif" }}>
                                {song.description}
                            </div>
                        </div>
                    )
                })}
            </div>
    )
}

export default SongsGrid;