import csrfFetch from "./crsf"

const GET_ALBUMS = "song/GET_ALBUMS"
const GET_ALBUM = "song/GET_ALBUM"

const getAlbums = (albums) => ({
    type: GET_ALBUMS,
    albums,
})

const getAlbum = (album) => ({
    type: GET_ALBUM,
    album,
})

export const getAllAlbums = () => async(dispatch) => {
    const response = await fetch("/api/albums");
    if(response.ok){
        const data = await response.json();
        dispatch(getAlbums(data));
    }
}

export const getTheAlbum = (albumId) => async(dispatch) => {
    const response = await fetch(`/api/albums/${albumId}`);
    if(response.ok){
        const data = await response.json();
        dispatch(getAlbum(data));
    }
}

const albumReducer = (state={}, action) => {
    switch(action.type){
        case GET_ALBUMS:{
            const allAlbums = {}
            action.albums.Albums.forEach((album => {
                allAlbums[album.id] = album;
            }))
            return {
                ...allAlbums
            }
        }
        case GET_ALBUM:{
            const oneAlbum = {}
            oneAlbum[action.album.id] = action.album;
            return {...oneAlbum};
        }
        default: 
            return state;
    }
}

export default albumReducer;