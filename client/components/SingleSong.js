import React from "react";
import { connect } from "react-redux";
import { fetchSingleSong } from "../store/singleSong";

class SingleSong extends React.Component {
    constructor() {
        super();

        this.state = {
            //key: this.props.song.key
            notes: ""
        };
        this.handleChange = this.handleChange.bind(this);
    };

    handleChange(event) {
        console.log(event.target.value)
        let newKey = event.target.value;
        for(let i in this.state.notes) {
            if(this.state.notes[i] === this.props.key) {
                let index = i - newKey;
                console.log(index)
            }
        }

        
    }

    componentDidMount() {
        this.props.fetchSingleSong(this.props.match.params.songId);
        
        this.setState({
            notes: {
                1:"A" ,2:"A#",3:"B",4:"C",5:"C#",6:"D",7:"D#",8:"E",9:"F",10:"F#",11:"G",12:"G#" 
            }
          });
    };


    render() {

        const { id, name, key, verse, chorus, preChorus, bridge} = this.props.song;
        //const minor = key.includes("m") ? true : false;
        let ogKey = key;
        
        return (
            <div key={id}>
                <h2>{name}</h2>
                <h3>Key of {key}</h3>
                <p>Transpose</p>
                <select name="transpose" onChange={this.handleChange}>
                    {Object.keys(this.state.notes).map((key, index) => (
                        key.includes("m") ? <option value={this.state.notes[key]} key={index}>{this.state.notes[key]}</option> :
                        <option value={index} key={index}>{this.state.notes[key]}m</option>
                    ))}
                </select>
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