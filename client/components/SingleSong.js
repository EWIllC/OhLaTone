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
            verse: [],
            preChorus: [],
            chorus: [],
            bridge: [],
            minorOr: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.chordValueMachine = this.chordValueMachine.bind(this);
        this.typeAssign = this.typeAssign.bind(this);

    };

    handleChange(event) {
        
        const { id, name, key, verse, chorus, preChorus, bridge, minorOr, notes} = this.state;

        let value = parseInt(event.target.value);
        
        let steps = value > key.val ? value - key.val : key.val - value;

        
        let newVerse = verse.map((chord, index) => 
        (
            this.typeAssign(notes[this.chordValueMachine(steps, chord, notes[value - 1].val, key.val)], chord)
        ));
        
        let newPreChorus = preChorus.map((chord, index) => 
        (
            this.typeAssign(notes[this.chordValueMachine(steps, chord, notes[value - 1].val, key.val)], chord)
        ));

        let newChorus = chorus.map((chord, index) => 
        (
            this.typeAssign(notes[this.chordValueMachine(steps, chord, notes[value - 1].val, key.val)], chord)
        ));

        let newBridge = bridge.map((chord, index) => 
        (
            this.typeAssign(notes[this.chordValueMachine(steps, chord, notes[value - 1].val, key.val)], chord)
        ));

        this.setState({
            key: notes[value - 1],
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

    componentDidMount() {

        this.props.fetchSingleSong(this.props.match.params.songId);

    };

    componentDidUpdate(prevProps) {
        if(prevProps.song !== this.props.song) {

            let {name, key, verse, preChorus, chorus, bridge} = this.props.song;

            this.setState({
                name: name,
                key: key,
                verse: verse,
                preChorus: preChorus,
                chorus: chorus,
                bridge: bridge,
                minorOr:  key.type === "m"

            })
        }
    };


    render() {

        const { id, name, key, verse, chorus, preChorus, bridge, minorOr, notes} = this.state;
        
        return (
            <div key={id}>
                <h2>{name}</h2>
                
                <h3>Key of {key.type ? key.note + key.type : key.note}</h3>
                <p>Transpose</p>
                <select name="transpose" onChange={this.handleChange}>
                    {notes.map((chord, index) => (
                        minorOr ? <option value={chord.val} key={index}>{chord.note}m</option> :
                        <option value={chord.val} key={index}>{chord.note}</option>
                    ))}
                </select>
                <h4>Verse</h4>
                {verse.map((chord) => (chord.type ? chord.note + chord.type + " " : chord.note + " "))}
                <h4>PreChorus</h4>
                {preChorus.map((chord) => (chord.type ? chord.note + chord.type + " " : chord.note + " "))}
                <h4>Chorus</h4>
                {chorus.map((chord) => (chord.type ? chord.note + chord.type + " " : chord.note + " "))}
                <h4>Bridge</h4>
                {bridge.map((chord) => (chord.type ? chord.note + chord.type + " " : chord.note + " "))}
            </div>

        )
    }
};

const mapState = (state) => ({ song: state.song });

const mapDispatch = (dispatch, { history }) => ({

    fetchSingleSong: (songId) => {dispatch(fetchSingleSong(songId))}

});

export default connect(mapState, mapDispatch)(SingleSong);