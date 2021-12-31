import React from "react";
import { connect } from "react-redux";
import { fetchSingleSong } from "../store/singleSong";
import { deleteSong } from "../store/songs";

class SingleSong extends React.Component {
    constructor() {

        super();

        this.state = {
        
            notes: [
                {val: 1, note:"A", type: null},
                {val: 2, note:"A#", type: null},
                {val: 3, note:"B", type: null},
                {val: 4, note:"C", type: null},
                {val: 5, note:"C#", type: null},
                {val: 6, note:"D", type: null},
                {val: 7, note:"D#", type: null},
                {val: 8, note:"E", type: null},
                {val: 9, note:"F", type: null},
                {val: 10, note:"F#", type: null},
                {val: 11, note:"G", type: null},
                {val: 12, note:"G#", type: null}
            ],
        
            key: {},
            sections: {},
            minorOr: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleEditRedirect = this.handleEditRedirect.bind(this);
        this.handleDelete = this.handleDelete.bind(this);

        this.chordValueMachine = this.chordValueMachine.bind(this);
        this.typeAssign = this.typeAssign.bind(this);

    };


    handleChange(event) {
        
        const { key, notes, sections} = this.state;

        let keyType = key.type

        let value = parseInt(event.target.value);
        
        let steps = value > key.val ? value - key.val : key.val - value;



        // Object.keys(sections).map((section) => (
        //     this.setState({
        //         key: notes[value - 1],
        //         sections: {
        //             [section]: {
        //                 name: sections[section].name,
        //                 chords: sections[section].chords.map((chord) => (
        //                     this.typeAssign(notes[this.chordValueMachine(steps, chord, notes[value - 1].val, key.val)], chord)
        //                 ))
        //             }
        //         }
        //     })
        // ))

        let newSections = {};

        let newKey = {
            val: notes[value - 1].val,
            note: notes[value - 1].note,
            type: keyType
        }
        
        Object.keys(sections).map((section) => (
            
            newSections[section] = {
                name: sections[section].name,
                chords: sections[section].chords.map((chord) => (
                    this.typeAssign(notes[this.chordValueMachine(steps, chord, notes[value - 1].val, key.val)], chord)
                ))
            }
            // {
            //     [sections[section].name]: {
            //         name: sections[section].name,
            //         chords: sections[section].chords.map((chord) => (
            //             this.typeAssign(notes[this.chordValueMachine(steps, chord, notes[value - 1].val, key.val)], chord)
            //         ))
            //     }
            // } 
            
        ))
        
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
            } 
        };

        if(newKeyValue < oldKeyValue) {
            
            if(chordValue - steps < 1) {
                
                return chordValue - steps + 11;

            } else {

                return chordValue - steps - 1;
            }
        };
        
    };

    typeAssign(notesChord, oldChord) {

        let newChord = {
            note: notesChord.note,
            type: null,
            val: notesChord.val
        }

        
        if(oldChord.type) {

            newChord.type = oldChord.type;

            return newChord;

        }
        if(oldChord.type === null) {

            return newChord;

        }
    }

    handleEditRedirect() {
        this.props.history.push(`${this.props.match.params.songId}/editSong`)
    }

    componentDidMount() {

        this.props.fetchSingleSong(this.props.match.params.songId);
        

    };

    componentDidUpdate(prevProps) {

        if(prevProps.song !== this.props.song) {

            let {name, key, sections} = this.props.song;

            this.setState({
                name: name,
                key: key,
                sections: sections,

                // checks if there is a type, and than if that type is minor
                minorOr: key.type ? key.type.includes("M") ? true : false : false

            })
        }
    };


    render() {

        const { id, name, key, sections, minorOr, notes} = this.state;

       console.log(minorOr)
        return (
            <div key={id}>
                <h2>{name}</h2>
                
                <h3>Key of {key.type ? key.note + key.type.toLowerCase() : key.note}</h3>
                <p>Transpose</p>
                <select name="transpose" onChange={this.handleChange}>
                    {notes.map((chord, index) => (
                        minorOr ? <option value={chord.val} key={index}>{chord.note}m</option> :
                        <option value={chord.val} key={index}>{chord.note}</option>
                    ))}
                </select>
                {Object.keys(sections).map((section) => {
                    
                    //console.log(this.state)
                    return (
                        
                        <div key={sections[section].name}>
                            <h4>{sections[section].name}</h4>
                            {sections[section].chords.map((chord) => (
                                chord.type ? chord.note + chord.type.toLowerCase() + ", " : chord.note + ", "
                                
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