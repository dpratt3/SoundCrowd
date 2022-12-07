import csrfFetch from "./crsf"

const GET_ALBUMS = "album/GET_ALBUMS"
const GET_ALBUM = "album/GET_ALBUM"
const DELETE_ALBUM = "album/DELETE_ALBUM"
const EDIT_ALBUM = "album/EDIT_ALBUM"
const CREATE_ALBUM = "album/CREATE_ALBUM"

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

const editAlbum = (album) => ({
    type: EDIT_ALBUM,
    album,
})

const createAlbum = (album) => ({
    type: CREATE_ALBUM,
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

export const deleteTheAlbum = (albumId) => async(dispatch) => {
    const options = {
        method: "DELETE"
    }
    const response = await csrfFetch(`/api/albums/${albumId}`, options)
    dispatch(deleteAlbum(albumId));
    return response
}

export const editTheAlbum = (album, albumId) => async(dispatch) => {
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(album)
    }
    const response = await csrfFetch(`/api/albums/${albumId}`, options);
    
    if(response.ok){
        const album = await response.json()
        dispatch(editAlbum(album));
        return album
    }
}

export const createTheAlbum = (album) => async(dispatch) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(album)
    }
    const response = await csrfFetch(`/api/albums`, options);

    if(response.ok){
        const album = await response.json()
        dispatch(createAlbum(album));
        return album
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
        case DELETE_ALBUM:{
            const newState = {...state}
            delete newState[action.albumId]
            return newState
        }
        case EDIT_ALBUM:{
            const newState = {...state}
            newState[action.album.id] = action.album
            return newState;
        }
        case CREATE_ALBUM:{
            const newState = {...state}
            newState[action.album.id] = action.album
            return newState;
        }
        default: 
            return state;
    }
}

export default albumReducer;