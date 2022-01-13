import React from "react";
import { connect } from "react-redux";
import { fetchSingleSong } from "../store/singleSong";
import { deleteSong } from "../store/songs";

class SingleSong extends React.Component {
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
        
            key: {},
            sections: {},
            keyArray: [],
            minorOr: false,
            keyShouldBe: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleEditRedirect = this.handleEditRedirect.bind(this);
        this.handleDelete = this.handleDelete.bind(this);

        this.chordValueMachine = this.chordValueMachine.bind(this);
        this.typeAssign = this.typeAssign.bind(this);
    };


    handleChange(event) {
        
        const { key, notes, sections} = this.state;

        const newKey = notes[event.target.value];

        const value = newKey.val;

        let steps = value > key.val ? value - key.val : key.val - value;

        if(key.type) {
            newKey.type = key.type;
        };
        
        let newSections = {};

        Object.keys(sections).map((section) => {

            const newChords = [];
            
            sections[section].chords.map((chord, index) => {

                
        
                let chordValue = this.chordValueMachine(steps, chord, newKey.val, key.val) + 1;
               
                const newChord = [];
                
                return Object.keys(notes).map((note) => {
                    if(chordValue === notes[note].val) {
                        
                        const typeAssigned = this.typeAssign(notes[note],chord);
                        
                        newChord.push(typeAssigned);

                        if(newChord.length < 2) {
                            
                            newChords.push(newChord[0]);
                        }
                        if(index === sections[section].chords.length - 1) {
                        
                            newSections[section] = {name: section, chords: newChords};
                        }
                    }
                })
                
            })
    });

        this.setState({
            key: newKey,
            sections: newSections
        });

    };


    handleDelete() {
        this.props.deleteSong(this.props.song.id);
        this.props.history.push("/songs");
    };

    
    chordValueMachine(steps, chord, newKeyValue, oldKeyValue) {

        let chordValue = chord.val;
        
        if(newKeyValue > oldKeyValue) {
            
            if(steps + chordValue > 12) {
                
                return chordValue + steps - 13;
                
            } else {
                
                return chordValue + steps - 1;
            };
        };

        if(newKeyValue < oldKeyValue) {
            
            if(chordValue - steps < 1) {
                
                return chordValue - steps + 11;

            } else {

                return chordValue - steps - 1;
            };
        };
    };


    typeAssign(notesChord, oldChord) {

        let newChord = {
            val: notesChord.val,
            note: notesChord.note,
            type: null,
        };
        
        if(oldChord.type) {

            newChord.type = oldChord.type;

            return newChord;

        };
        if(oldChord.type === null) {

            return newChord;

        };
    };


    handleEditRedirect() {
        this.props.history.push(`${this.props.match.params.songId}/editSong`)
    };


    componentDidMount() {
        this.props.fetchSingleSong(this.props.match.params.songId);
    };


    componentDidUpdate(prevProps, prevState) {
        
        if(prevState.key.val === this.state.key.val) {
            console.log("i worked")
        }

        if(prevProps.song !== this.props.song) {

            let {name, key, sections} = this.props.song;

            this.setState({
                name: name,
                key: key,
                sections: sections,
                keyArray: Object.keys(sections),

                // checks if there is a type, and than if that type is minor
                minorOr: key.type ? key.type.includes("M") ? true : false : false

            })
        };
    };


    render() {

        const { id, name, key, sections, keyArray, minorOr, notes} = this.state;

        //const keyArray = Object.keys(sections)
        const notesArray = Object.keys(notes)

        return (
            <div key={id}>
                <h2>{name}</h2>
                
                <h3>Key of {key.type ?
                key.note + key.type.toLowerCase() : 
                key.note
                }
                </h3>

                <p>Transpose</p>
                <select name="transpose" onChange={this.handleChange}>

                    {notesArray.map((chord, index) => {
                        if(key.note) {
                            
                            if(!key.note.includes("b")) {
                
                                if(!chord.includes("b")) {

                                    return (
                                        minorOr ? 
                                        <option value={chord} key={index}>{chord}m</option> :
                                        <option value={chord} key={index}>{chord}</option>
                                    )
                                }

                            } else {

                                if(!chord.includes("#")) {

                                    return (
                                        minorOr ? 
                                        <option value={chord} key={index}>{chord}m</option> :
                                        <option value={chord} key={index}>{chord}</option>
    
                                    )
                                }
                            }
                        } else {
                            console.log(key.note)
                        }
                        
                    })}
                </select>
                {keyArray.map((section) => {
                    
                    
                    return (
                        
                        <div key={sections[section].name}>
            
                            <h4>{sections[section].name}</h4>
                            {sections[section].chords.map((chord) => (

                                chord.type ?
                                chord.note + chord.type.toLowerCase() + ", " : 
                                chord.note + ", "
                            ))}
                            
                        </div>
                        
                    )
                })}
                
                <p>
                <button onClick={this.handleEditRedirect}>Edit</button>
                <button onClick={this.handleDelete}>Delete</button>
                </p>
        
            </div>

        )
    }
};

const mapState = (state) => ({ song: state.song });

const mapDispatch = (dispatch, { history }) => ({

    fetchSingleSong: (songId) => {dispatch(fetchSingleSong(songId))},
    deleteSong: (songId) => (dispatch(deleteSong(songId)))

});

export default connect(mapState, mapDispatch)(SingleSong);