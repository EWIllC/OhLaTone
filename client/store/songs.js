import axios from "axios"

const SET_SONGS = "SET_SONGS";
const ADD_SONG = "ADD_SONG";

const setSongs = (songs) => {
    return { type: SET_SONGS, songs };
}

const setNewSong = (song) => {
    return { type: ADD_SONG, song };
}

export const fetchSongs = () => {
    return async (dispatch) => {
        const { data } = await axios.get("/api/songs");
        dispatch(setSongs(data));
    }
}

export const addSong = (song) => {
    return async (dispatch) => {
        const { data } = await axios.post("/api/songs", song)

        dispatch(fetchSongs());
    }
}

export default function songsReducer (state = [], action) {
    switch(action.type) {
        case SET_SONGS:
            return action.songs;

        case ADD_SONG:
            return [...state, action.songs];

        default:
            return state;
    }
}