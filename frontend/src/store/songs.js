const GET_SONGS = "song/GET_SONGS"
const GET_SONG = "song/GET_SONG"

const getSongs = (songs) => ({
    type: GET_SONGS,
    songs,
})

const getSong = (song) => ({
    type: GET_SONG,
    song,
})

export const getAllSongs = () => async(dispatch) => {
    const response = await fetch("/api/songs");
    if(response.ok){
        const data = await response.json();
        dispatch(getSongs(data));
    }
}

export const getTheSong = (songId) => async(dispatch) => {
    const response = await fetch(`/api/songs/${songId}`);
    if(response.ok){
        const data = await response.json();
        dispatch(getSong(data));
    }
}

const songReducer = (state={}, action) => {
    switch(action.type){
        case GET_SONGS:{
            const allSongs = {}
            action.songs.Songs.forEach((song => {
                allSongs[song.id] = song;
            }))
            return {
                ...allSongs
            }
        }
        case GET_SONG:{
            const theSong = {}
        }
        default: 
        return state;
    }
}

export default songReducer;