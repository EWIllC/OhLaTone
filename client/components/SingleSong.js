import React from "react";
import { connect } from "react-redux";
import { fetchSingleSong } from "../store/singleSong";

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
            intro: [],
            verse: [],
            preChorus: [],
            chorus: [],
            bridge: [],
            minorOr: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleEditRedirect = this.handleEditRedirect.bind(this);
        this.chordValueMachine = this.chordValueMachine.bind(this);
        this.typeAssign = this.typeAssign.bind(this);

    };

    handleChange(event) {
        
        const { id, name, key, intro, verse, chorus, preChorus, bridge, minorOr, notes} = this.state;

        let value = parseInt(event.target.value);
        
        let steps = value > key.val ? value - key.val : key.val - value;
        
        //console.log(verse)
        let newIntro = intro[0] !== null ?
        intro.map((chord, index) => 
        (
            this.typeAssign(notes[this.chordValueMachine(steps, chord, notes[value - 1].val, key.val)], chord)
        )) : [null]

        let newVerse = verse[0] !== null ? verse.map((chord, index) => 
        (
            this.typeAssign(notes[this.chordValueMachine(steps, chord, notes[value - 1].val, key.val)], chord)
        )) : [null]

        
        let newPreChorus = preChorus[0] !== null ? preChorus.map((chord, index) => 
        (
            this.typeAssign(notes[this.chordValueMachine(steps, chord, notes[value - 1].val, key.val)], chord)
        )) : [null]

        let newChorus = chorus[0] !== null ? chorus.map((chord, index) => 
        (
            this.typeAssign(notes[this.chordValueMachine(steps, chord, notes[value - 1].val, key.val)], chord)
        )) : [null]

        let newBridge = bridge[0] !== null ? bridge.map((chord, index) => 
        (
            this.typeAssign(notes[this.chordValueMachine(steps, chord, notes[value - 1].val, key.val)], chord)
        )) : [null]

        this.setState({
            key: notes[value - 1],
            intro: newIntro,
            verse: newVerse,
            preChorus: newPreChorus,
            chorus: newChorus,
            bridge: newBridge
        })

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

    typeAssign(newChord, oldChord) {
        
        if(oldChord.type) {

            newChord.type = oldChord.type;

            return newChord;

        } else {

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

            let {name, key, intro, verse, preChorus, chorus, bridge} = this.props.song;

            this.setState({
                name: name,
                key: key,
                intro: intro,
                verse: verse,
                preChorus: preChorus,
                chorus: chorus,
                bridge: bridge,
                minorOr:  key.type.includes("M")

            })
        }
    };


    render() {

        const { id, name, key, intro, verse, chorus, preChorus, bridge, minorOr, notes} = this.state;
       
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
                <h4>Intro</h4>
                {intro[0] !== null ? 
                intro.map((chord) => (chord.type ? chord.note + chord.type.toLowerCase() + " " : chord.note + " ")) :
                <p>n/a</p>}
                <h4>Verse</h4>
                {verse[0] !== null ? 
                verse.map((chord) => (chord.type ? chord.note + chord.type.toLowerCase() + " " : chord.note + " ")) :
                <p>n/a</p>}
                <h4>PreChorus</h4>
                {preChorus[0] !== null ? preChorus.map((chord) => (chord.type ? chord.note + chord.type.toLowerCase() + " " : chord.note + " ")) :
                <p>n/a</p>}
                <h4>Chorus</h4>
                {chorus[0] !== null ? 
                chorus.map((chord) => (chord.type ? chord.note + chord.type.toLowerCase() + " " : chord.note + " ")) :
                <p>n/a</p>}
                <h4>Bridge</h4>
                {bridge[0] !== null ? 
                bridge.map((chord) => (chord.type ? chord.note + chord.type.toLowerCase() + " " : chord.note + " ")) : 
                <p>n/a</p>}

                <p>
                <button onClick={this.handleEditRedirect}>Edit</button>
                </p>
        
            </div>

        )
    }
};

const mapState = (state) => ({ song: state.song });

const mapDispatch = (dispatch, { history }) => ({

    fetchSingleSong: (songId) => {dispatch(fetchSingleSong(songId))}

});

export default connect(mapState, mapDispatch)(SingleSong);