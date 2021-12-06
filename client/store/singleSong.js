import axios from "axios";

const SET_SONG = "SET_SONG";

const setSingleSong = (song) => {
    return { type: SET_SONG, song };
}

export const fetchSingleSong = (songId) => {
    return async (dispatch) => {
        const { data } = await axios.get(`/api/songs/${songId}`);
        dispatch(setSingleSong(data));
    }
}

export default function singleSongReducer (state = [], action) {
    switch(action.type) {
        case SET_SONG:
            return action.song;
        
        default: 
            return state;
    }
}