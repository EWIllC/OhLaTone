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
            addSection: { name: "", chords: "" },
            sections: {}

        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.newSection = this.newSection.bind(this);
        this.handleAddSectionSubmit = this.handleAddSectionSubmit.bind(this);

    };

    handleChange(event) {

        const { sections } = this.state
        if(event.target.name === "addSection") {
            this.setState({
                [event.target.name]: {name: event.target.value, chords: this.state[event.target.name].chords}
            })
        } else {
            this.setState({
                sections: {...sections,
                    [event.target.name]: {
                        name: event.target.name,
                        chords: event.target.value
                    }
                }
            })
        }
    };

    handleSubmit(event) {
        event.preventDefault();

        const { songName, key, intro, verse, preChorus, chorus, bridge } = this.state;

        if(!this.state.notes[key[0]]) {
            alert("song needs a valid key");
        };

        const newSong = {
            name: songName,
            key: this.newSection(key.toUpperCase())[0],
            intro: this.newSection(intro.toUpperCase()),
            verse: this.newSection(verse.toUpperCase()),
            preChorus: this.newSection(preChorus.toUpperCase()),
            chorus: this.newSection(chorus.toUpperCase()),
            bridge: this.newSection(bridge.toUpperCase()),
        }
        this.props.addSong(newSong);
        //this.props.history.push("/songs");
    };

    handleAddSectionSubmit(event) {
        event.preventDefault();
        const { addSection, sections } = this.state;
        this.setState({
            sections: {...sections,
            [addSection.name]: {
                name: addSection.name,
                chords: addSection.chords }
            }
        })
        console.log(this.state)
    }

    // fromats the text into the standard data type for a song section
    // removes spaces, formats to an array, 
    //decernes weather or not a note is sharp so it may set the type accodingly
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


    render() {
        const { name, key, intro, verse, preChorus, chorus, bridge, sections, addSection } = this.state;
        return (
            <div>Add a Song

                <form onSubmit={this.handleAddSectionSubmit}>
                    <h3>Add a Section?</h3>
                    {/* <button value="Verse" onClick={this.addSection}>Verse</button>
                    <button value="Chorus" onClick={this.addSection}>Chorus</button> */}
                    <p>
                    <input
                    className="songForm"
                    type="text"
                    name="addSection"
                    value={addSection.name}
                    onChange={this.handleChange}
                    />
                    <button type="submit">Submit</button>
                    </p>
                </form>

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

                    {Object.keys(sections).map((section) => {

                        console.log(sections[section].name)

                        return (

                            <div key={sections[section].name}>
                                <h4>{sections[section].name}</h4>
                                <input
                                className ="songForm"
                                type="text"
                                name={sections[section].name}
                                value={sections[section].chords}
                                onChange={this.handleChange}
                                />
                            </div>

                        )
                    })}
                    {/* <h4>Intro:</h4>
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
                </form> */}
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