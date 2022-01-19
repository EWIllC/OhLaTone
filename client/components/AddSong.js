import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addSong } from "../store/songs";

class AddSong extends React.Component {
    constructor() {
        super();
        this.state = {

            notes: {
                "A": {val: 1, note:"A", type: null},
                "A#": {val: 2, note:"A#", type: null},
                "Bb": {val: 2, note:"Bb", type: null},
                "B": {val: 3, note:"B", type: null},
                "C": {val: 4, note:"C", type: null},
                "C#": {val: 5, note:"C#", type: null},
                "Db": {val: 5, note:"Db", type: null},
                "D": {val: 6, note:"D", type: null},
                "D#": {val: 7, note:"D#", type: null},
                "Eb": {val: 7, note:"Eb", type: null},
                "E": {val: 8, note:"E", type: null},
                "F": {val: 9, note:"F", type: null},
                "F#": {val: 10, note:"F#", type: null},
                "Gb": {val: 10, note:"Gb", type: null},
                "G": {val: 11, note:"G", type: null},
                "G#": {val: 12, note:"G#", type: null},
                "Ab": {val: 12, note:"Ab", type: null}
            },
                
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

        if(event.target.name === "songName") {
            
            this.setState({
                [event.target.name]: event.target.value
            });
        };

        if(event.target.name === "key") {

            this.setState({
                [event.target.name]: event.target.value
            });
        };

        if(event.target.name === "addSection") {

            this.setState({
                [event.target.name]: {name: event.target.value, chords: this.state[event.target.name].chords}
            });
        };

        if(this.state.sections[event.target.name]) {
            
            this.setState({
                sections: {...sections,
                    [event.target.name]: {
                        name: event.target.name,
                        chords: event.target.value
                    }
                }
            });
        };
    };

    handleSubmit(event) {
        event.preventDefault();

        const { songName, key, sections } = this.state;

        let keyEnding = key.slice(1);
        let keyFirst = key[0].toUpperCase();
        let newKey = keyFirst + keyEnding

        if(!this.state.notes[newKey[0]]) {
            alert("song needs a valid key");
        };

        
        
        const sectionsHash = {};
        
        Object.keys(sections).map((section) => {
           
                return sectionsHash[section] = { name: `${sections[section].name}`, chords: this.newSection(sections[section]) }}
                
        );

        const newSong = {
            name: songName,
            key: this.newSection(key)[0],
            sections: sectionsHash
        };

        
        this.props.addSong(newSong);
        this.props.history.push("/songs");
    };

    handleAddSectionSubmit(event) {
        event.preventDefault();

        const secName = event.target.name !== "" ?
        event.target.name : 
        this.state.addSection.name;

        const { sections, addSection} = this.state;

        this.setState({
            addSection: { name: "", chords: "" },
            sections: {...sections,
            [secName]: {
                name: secName,
                chords: addSection.chords }
            }
        })
    };

    // fromats the text into the standard data type for a song section
    // removes spaces, formats to an array, 
    // decernes weather or not a note is sharp so it may set the type accodingly
    newSection(section) {

        const{ notes } = this.state;

        const spaceless = section.chords ? section.chords.replace(/\s/g, '') : section;

        const split = spaceless.split(",");

        
        return split.map((chord) => {
            
            if(chord.length) {

                let chordEnding = chord.slice(1);
                let chordFirst = chord[0].toUpperCase();
                let newChord = chordFirst + chordEnding;

                if(newChord.includes("b") || newChord.includes("#")) {
                    console.log("is sharp or flat")

                    let type = newChord.includes("b") ? 
                    newChord.slice(newChord.indexOf("b") + 1) :
                    newChord.slice(newChord.indexOf("#") + 1);

                    newChord = newChord.slice(0,2);

                    if(!notes[newChord]) {
                        alert("not a valid chord");
                    };

                    let createChord = {
                        val: notes[newChord].val,
                        note: notes[newChord].note,
                        type: type
                    };
                    
                    type.length > 0 ? createChord.type = type : createChord.type = null;
                    
                    console.log(createChord)
                    return createChord;

                } else {
                    console.log("is NOT sharp or flat")

                    let type = newChord.slice(1);
                    newChord = newChord.slice(0,1);

                    if(!notes[newChord]) {
                        alert("not a valid chord");
                    };

                    let createChord = {
                        val: notes[newChord].val,
                        note: notes[newChord].note,
                        type: type
                    };
                    
                    type.length > 0 ? createChord.type = type : createChord.type = null;
                    
                    console.log(createChord)
                    return createChord;
                }
            }
        });
    };


    render() {
        const { name, key, sections, addSection } = this.state;
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
                    <p>
                        <button onClick={(event) => this.handleAddSectionSubmit(event)} name="Verse">Verse</button>
                        <button onClick={(event) => this.handleAddSectionSubmit(event)} name="Chorus">Chorus</button>
                        <button onClick={(event) => this.handleAddSectionSubmit(event)} name="Bridge">Bridge</button>
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