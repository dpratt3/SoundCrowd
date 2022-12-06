import csrfFetch from "./crsf"

const GET_SONGS = "song/GET_SONGS"
const GET_SONG = "song/GET_SONG"
const DELETE_SONG = "song/DELETE_SONG"
const EDIT_SONG = "song/DELETE_SONG"

const getSongs = (songs) => ({
    type: GET_SONGS,
    songs,
})

const getSong = (song) => ({
    type: GET_SONG,
    song,
})

const deleteSong = (songId) => ({
    type: DELETE_SONG,
    songId,
})

const editSong = (song) => ({
    type: EDIT_SONG,
    song
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

export const deleteTheSong = (songId) => async(dispatch) => {
    const options = {
        method: "DELETE"
    }
    const response = await csrfFetch(`/api/songs/${songId}`, options);
    dispatch(deleteSong(songId));
    return response
}

export const editTheSong = (song, songId) => async(dispatch) => {
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(song)
    }
    const response = await csrfFetch(`/api/songs/${songId}`, options);
    
    if(response.ok){
        const song = await response.json
        dispatch(editSong(song));
        return song
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
            const oneSong = {}
            oneSong[action.song.id] = action.song;
            return {...oneSong};
        }
        case DELETE_SONG:{
            // const oneSong = {};
            // delete oneSong[action.songId]
            const newState = {...state}
            //console.log(newState, ` <------------- before deletion`)
            delete newState[action.songId]
            return newState;
        }
        case EDIT_SONG:{
            const newState = {...state}
            newState[action.song.id] = action.song
            return newState;
        }
        default: 
            return state;
    }
}

export default songReducer;