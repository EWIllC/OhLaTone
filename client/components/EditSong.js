import React from "react";
import { connect } from "react-redux";
import { fetchSingleSong } from "../store/singleSong";
import { editSong } from "../store/songs";

class EditSong extends React.Component {

    constructor() {
        super();

        this.state = {

            notes: {
            "A":{val: 1, note:"A", type: ""},
            "A#":{val: 2, note:"A#", type: ""},
            "B":{val: 3, note:"B", type: ""},
            "C":{val: 4, note:"C", type: ""},
            "C#":{val: 5, note:"C#", type: ""},
            "D":{val: 6, note:"D", type: ""},
            "D#":{val: 7, note:"D#", type: ""},
            "E":{val: 8, note:"E", type: ""},
            "F":{val: 9, note:"F", type: ""},
            "F#":{val: 10, note:"F#", type: ""},
            "G":{val: 11, note:"G", type: ""},
            "G#":{val: 12, note:"G#", type: ""}},
                
            songName: "",
            key: "",
            intro: "",
            verse: "",
            preChorus: "",
            chorus: "",
            bridge: "",

        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.newSection = this.newSection.bind(this);
        this.mapper = this.mapper.bind(this);

    };

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    handleSubmit(event) {
        event.preventDefault();
        const { songName, key, intro, verse, preChorus, chorus, bridge } = this.state;

        if(!this.state.notes[key[0]]) {
            alert("song needs a valid key");
        };
        
        const newSong = {
            id: this.props.song.id,
            name: songName,
            key: this.newSection(key.toUpperCase())[0],
            intro: this.newSection(intro.toUpperCase()),
            verse: this.newSection(verse.toUpperCase()),
            preChorus: this.newSection(preChorus.toUpperCase()),
            chorus: this.newSection(chorus.toUpperCase()),
            bridge: this.newSection(bridge.toUpperCase()),
        }
        
        this.props.editSong(newSong);
        this.props.history.push("/songs");
    };

    newSection(section) {
        const{ notes } = this.state;
        const spaceless = section.replace(/\s/g, '');
        const split = spaceless.split(",");
        
        return split.map((chord) => {

            if(!chord.includes("#") && chord.length) {

                let type = chord.slice(1);
                chord = chord.slice(0,1);

                if(!notes[chord]) {
                    alert("not a valid chord");
                };

                let newChord = {
                    val: notes[chord].val,
                    note: notes[chord].note,
                    type: type
                };
                
                type.length > 0 ? newChord.type = type : newChord.type = null;
                
                return newChord;

            } else if (chord.length) {

                let type = chord.slice(chord.indexOf("#") + 1);
                chord = chord.slice(0,2);

                if(!notes[chord]) {
                    alert("not a valid chord");
                };

                let newChord = {
                    val: notes[chord].val,
                    note: notes[chord].note,
                    type: type
                };
                type.length > 0 ? newChord.type = type : newChord.type = null;

                return newChord;
            }
        });
    };

    mapper(arr) {

        return arr.map((chord) => (
            chord.type !== null ? chord.note + chord.type.toLowerCase() :
            chord.note 
        )).join(", ")
    };


    componentDidMount() {

        this.props.fetchSingleSong(this.props.match.params.songId);

    };

    componentDidUpdate(prevProps) {
        if(prevProps.song !== this.props.song) {

            let {name, key, intro, verse, preChorus, chorus, bridge} = this.props.song;

            this.setState({
                songName: name,
                key: key.type ? key.note + key.type.toLowerCase() : key.note,
                intro: intro[0] !== null ? this.mapper(intro) : "",
                verse: verse[0] !== null ? this.mapper(verse) : "",
                preChorus: preChorus[0] !== null ? this.mapper(preChorus) : "",
                chorus: chorus[0] !== null ? this.mapper(chorus) : "",
                bridge: bridge[0] !== null ? this.mapper(bridge) : "",
            })
        }
    };
    

    render() {

        const { songName, key, intro, verse, preChorus, chorus, bridge } = this.state;

        return (
            //<p>hello world</p>
             <div>Edit Song
                 <form onSubmit={this.handleSubmit}>
                    <h4>Name:</h4>

                    <input
                     className = "songForm"
                     type="text"
                     name="songName"
                     value={songName}
                     //placeholder={songName}
                     onChange={this.handleChange}
                     />

                    <h4>Key:</h4>
                    <input
                    className = "songForm"
                    type="text"
                    name="key"
                    value={key}
                    //placeholder={key.note + key.type.toLowerCase()}
                    onChange={this.handleChange}
                    />

                    <h4>Intro:</h4>
                     <input
                    className = "songForm"
                    type="text"
                    name="intro"
                    value={intro}
                    onChange={this.handleChange}
                    />

                    <h4>Verse:</h4>
                    <input
                    className = "songForm"
                    type="text"
                    name="verse"
                    value={verse}
                    onChange={this.handleChange}
                    />
                    
                    <h4>Pre-Chorus:</h4>
                    <input
                    className = "songForm"
                    type="text"
                    name="preChorus"
                    value={preChorus}
                    onChange={this.handleChange}
                    />

                    <h4>Chorus:</h4>
                    <input
                    className = "songForm"
                    type="text"
                    name="chorus"
                    value={chorus}
                    onChange={this.handleChange}
                    />

                    <h4>Bridge:</h4>
                    <input
                    className = "songForm"
                    type="text"
                    name="bridge"
                    value={bridge}
                    onChange={this.handleChange}
                    />

                    <p>
                    <button type="submit">Submit</button>
                    </p>
                </form>

            </div>      
        )
    };
};

const mapState = (state) => ({ song: state.song });

const mapDispatch = (dispatch, { history }) => ({

    fetchSingleSong: (songId) => {dispatch(fetchSingleSong(songId))},

    editSong: (song) => (dispatch(editSong(song)))

});

export default connect(mapState, mapDispatch)(EditSong);