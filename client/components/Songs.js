import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchSongs } from "../store/songs";

class Songs extends React.Component {

    componentDidMount() {
        this.props.fetchSongs();
    }

    render() {

        const { songs } = this.props;

        return (
            <div>
                <div>This is the Songs</div>
                {songs.map((song) => {
                    return (
                        <div key={song.id}>
                        <Link to={`/songs/${song.id}`}>{song.name}</Link>
                    </div>
                    );
                })}
            </div>
        )
    }
};

const mapState = (state) => ({ songs: state.songs });

const mapDispatch = (dispatch, { history }) => ({
    fetchSongs: () => dispatch(fetchSongs())
});

export default connect(mapState, mapDispatch)(Songs);