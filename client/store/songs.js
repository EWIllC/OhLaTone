import axios from "axios"

const SET_SONGS = "SET_SONGS";
const ADD_SONG = "ADD_SONG";
const EDIT_SONG = "EDIT_SONG";

const setSongs = (songs) => {
    return { type: SET_SONGS, songs };
}

const setNewSong = (song) => {
    return { type: ADD_SONG, song };
}

const setEditSong = (song) => {
    return { type: EDIT_SONG, song };
}

export const fetchSongs = () => {
    return async (dispatch) => {

        const { data } = await axios.get("/api/songs");

        dispatch(setSongs(data));
    }
}

export const addSong = (song) => {
    return async (dispatch) => {

        const { data } = await axios.post("/api/songs", song);

        dispatch(fetchSongs());
    }
}

export const editSong = (song) => {
    return async (dispatch) => {
        
        await axios.put(`/api/songs/${song.id}`, song);

        dispatch(setEditSong(song));
    }
}

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

        default:
            return state;
    }
}