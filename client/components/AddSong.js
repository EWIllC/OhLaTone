import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addSong } from "../store/songs";

class AddSong extends React.Component {
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

    };

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    handleSubmit(event) {
        event.preventDefault();
        const { songName, key, intro, verse, preChorus, chorus, bridge } = this.state;
        const newSong = {
            name: songName,
            key: this.newSection(key.toUpperCase())[0],
            intro: this.newSection(intro.toUpperCase()),
            verse: this.newSection(verse.toUpperCase()),
            preChorus: this.newSection(preChorus.toUpperCase()),
            chorus: this.newSection(chorus.toUpperCase()),
            bridge: this.newSection(bridge.toUpperCase()),
        }
        this.props.addSong(newSong)
        this.props.history.push("/songs")
    };

    newSection(section) {
        const{ notes } = this.state;
        const spaceless = section.replace(/\s/g, '');
        const split = spaceless.split(",");
        
        return split.map((chord) => {

            if(!chord.includes("#") && chord.length) {

                let type = chord.slice(1);
                chord = chord.slice(0,1);
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
                let newChord = {
                    val: notes[chord].val,
                    note: notes[chord].note,
                    type: type
                };
                type.length > 0 ? newChord.type = type : newChord.type = null;

                return newChord;
            }
        });
    }

    render() {
        const { name, key, intro, verse, preChorus, chorus, bridge } = this.state;
        return (
            <div>Add a Song
                <form onSubmit={this.handleSubmit}>
                    <h4>Name:</h4>

                    <input
                    className = "songForm"
                    type="text"
                    name="songName"
                    value={name}
                    onChange={this.handleChange}
                    />

                    <h4>Key:</h4>
                    <input
                    className = "songForm"
                    type="text"
                    name="key"
                    value={key}
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

const mapState = (state) => ({});

const mapDispatch = (dispatch) => ({

    addSong: (song) => dispatch(addSong(song))

});

export default connect(null, mapDispatch)(AddSong);