import axios from "axios"

const SET_SONGS = "SET_SONGS";

export const setSongs = (songs) => {
    return { type: SET_SONGS, songs };
}

export const fetchSongs = () => {
    return async (dispatch) => {
        const { data } = await axios.get("/api/songs");
        dispatch(setSongs(data));
    }
}

export default function songsReducer (state = [], action) {
    switch(action.type) {
        case SET_SONGS:
            return action.songs;

        default:
            return state;
    }
}