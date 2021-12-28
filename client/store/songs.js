import axios from "axios"

const SET_SONGS = "SET_SONGS";
const ADD_SONG = "ADD_SONG";
const EDIT_SONG = "EDIT_SONG";
const DELETE_SONG = "DELETE_SONG";

const setSongs = (songs) => {
    return { type: SET_SONGS, songs };
};

const setNewSong = (song) => {
    return { type: ADD_SONG, song };
};

const setEditSong = (song) => {
    return { type: EDIT_SONG, song };
};

// const setDeleteSong = (songId) => {
//     return { tyope: DELETE_SONG, songId };
// };

export const fetchSongs = () => {
    return async (dispatch) => {

        const { data } = await axios.get("/api/songs");

        dispatch(setSongs(data));
    };
};

export const addSong = (song) => {
    return async (dispatch) => {

        const { data } = await axios.post("/api/songs", song);

        dispatch(fetchSongs());
    };
};

export const editSong = (song) => {
    console.log(song)
    return async (dispatch) => {
        
        await axios.put(`/api/songs/${song.id}`, song);

        dispatch(setEditSong(song));
    };
};

export const deleteSong = (songId) => {
    return async (dispatch) => {

        await axios.delete(`/api/songs/${songId}`);

        dispatch(fetchSongs());
    };
};

export default function songsReducer (state = [], action) {

    switch(action.type) {

        case SET_SONGS:
            return action.songs;

        case ADD_SONG:
            return [...state, action.songs];
        
        case EDIT_SONG:
            return [...state.filter((song) => {
                
                if(song.id !== action.song.id) {
                    //console.log(song)
                    return song;
                }
            }), action.song];

        case DELETE_SONG:
            return [...state.filter((song) => {
                if(song.id !== action.songId) {
                    return song
                }
            })];

        default:
            return state;
    };
};