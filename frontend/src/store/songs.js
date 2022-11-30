const GET_SONGS = "song/GET_SONGS"

const getSongs = (songs) => ({
    type: GET_SONGS,
    songs,
})

export const getAllSongs = () => async(dispatch) => {
    const response = await fetch("/api/songs");
    if(response.ok){
        const data = await response.json();
        dispatch(getSongs(data));
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
        default: 
        return state;
    }
}

export default songReducer;