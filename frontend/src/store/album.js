import csrfFetch from "./crsf"

const GET_ALBUMS = "album/GET_ALBUMS"
const GET_ALBUM = "album/GET_ALBUM"
const DELETE_ALBUM = "album/DELETE_ALBUM"

const getAlbums = (albums) => ({
    type: GET_ALBUMS,
    albums,
})

const getAlbum = (album) => ({
    type: GET_ALBUM,
    album,
})

const deleteAlbum = (albumId) => ({
    type: DELETE_ALBUM,
    albumId,
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

export const deleteTheAlbum = (albumId) => async(dispatch) => {
    const options = {
        method: "DELETE"
    }
    const response = await csrfFetch(`/api/albums/${albumId}`, options)
    dispatch(deleteAlbum(albumId));
    return response
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
        case DELETE_ALBUM:{
            const newState = {...state}
            delete newState[action.albumId]
            return newState
        }
        default: 
            return state;
    }
}

export default albumReducer;