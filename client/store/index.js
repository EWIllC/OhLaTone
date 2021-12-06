import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import songsReducer from "./songs";
import singleSongReducer from "./singleSong";

const reducer = combineReducers({
    songs: songsReducer,
    song: singleSongReducer
});

const middleWare = composeWithDevTools(
    applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);

const store = createStore(reducer, middleWare);

export default store;