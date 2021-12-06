import React from "react";
import { connect } from "react-redux";
import { fetchSingleSong } from "../store/singleSong";
import Songs from "./Songs";

class SingleSong extends React.Component {
    constructor() {
        super();

        this.state = {};

    }

    componentDidMount() {
        this.props.fetchSingleSong(this.props.match.params.songId);
    };

    render() {

        const { id, name, key, verse, chorus, preChorus, bridge} = this.props.song;

        return (
            <div key={id}>
                <h2>{name}</h2>
                <h3>Key of {key}</h3>
                <h4>Verse</h4>
                <p>{verse}</p>
                <h4>PreChorus</h4>
                <p>{preChorus}</p>
                <h4>Chorus</h4>
                <p>{chorus}</p>
                <h4>Bridge</h4>
                <p>{bridge}</p>
            </div>

        )
    }
}

const mapState = (state) => ({ song: state.song });

const mapDispatch = (dispatch, { history }) => ({
    fetchSingleSong: (songId) => {dispatch(fetchSingleSong(songId))}
});
export default connect(mapState, mapDispatch)(SingleSong);