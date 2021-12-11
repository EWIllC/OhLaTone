import React from "react";
import { connect } from "react-redux";
import { fetchSingleSong } from "../store/singleSong";

class SingleSong extends React.Component {
    constructor() {
        super();

        this.state = {
            //key: this.props.song.key,
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
        //this.transmute = this.transmute.bind(this);
    };

    handleChange(event) {
        
        const { id, name, key, verse, chorus, preChorus, bridge, minorOr, notes} = this.state;

        let value = parseInt(event.target.value);
        
        let steps = value > key.val ? value - key.val : key.val - value;


        //since im stepping backwords decrement


        let stepDir = key.val < value;

        
        //let newKey = notes[this.chordValueMachine(steps, key.val)]
        let newVerse = verse.map((chord, index) => 
        (
            this.typeAssign(notes[this.chordValueMachine(steps, chord, notes[value - 1].val, key.val)], chord)
        ))
        
        //console.log(newVerse)
        let newPreChorus = preChorus.map((chord, index) => 
        (
            this.typeAssign(notes[this.chordValueMachine(steps, chord, notes[value - 1].val, key.val)], chord)
        ))

        let newChorus = chorus.map((chord, index) => 
        (
            this.typeAssign(notes[this.chordValueMachine(steps, chord, notes[value - 1].val, key.val)], chord)
        ))

        let newBridge = bridge.map((chord, index) => 
        (
            this.typeAssign(notes[this.chordValueMachine(steps, chord, notes[value - 1].val, key.val)], chord)
        ));


        //console.log(newKey, "key", newVerse, "verse", newPreChorus, "pre", newChorus, "chorus", newBridge, "bridge")
        this.setState({
            key: notes[value - 1],
            verse: newVerse,
            preChorus: newPreChorus,
            chorus: newChorus,
            bridge: newBridge
        })

    }
    
    chordValueMachine(steps, chord, newKeyValue, oldKeyValue) {

        let chordValue = chord.val
       
        if(newKeyValue > oldKeyValue) {
            
            if(steps + chordValue > 12) {
                //console.log("greater than 12")
                return chordValue + steps - 13;
                
            } else {
                //console.log("less than 12")
                return chordValue + steps - 1;
            } 
        }

        if(newKeyValue < oldKeyValue) {
            //console.log(chordValue - steps)
            if(chordValue - steps < 1) {
                //console.log(this.state.notes[chordValue - steps + 11])
                return chordValue - steps + 11
            } else {
                return chordValue - steps - 1
            }
        }
    };

    typeAssign(newChord, oldChord) {

        if(oldChord.type) {
            newChord.type = oldChord.type
            return newChord
        } else {
            return newChord
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
                //minorOr:  key.includes("m") ? true : false

            })
        }
    }

    // transmute(chords, steps) {
    //     let hashed = {};
    //     // console.log(chords, 'chors');
    //     // console.log(hashed, "hashed")
    //     for(let i in chords) {
    //         console.log(i)
    //         //hashed[this.state.notes[parseInt(i) + steps]]
    //         if(chords[i].includes("m")) {
    //             hashed[parseInt(i) + steps] = this.state.notes[parseInt(i) + steps] + "m";
    //         } else {
    //             hashed[parseInt(i) + steps] = this.state.notes[parseInt(i) + steps]
    //         }
    //         // hashed[i] = this.state.notes[parseInt(i) + steps]
    //         //console.log(hashed)
    //         //console.log(this.state.notes[parseInt(i) + steps])
            

    //     }
    //     //console.log(hashed);
    //     return hashed;
    // }


    render() {

        const { id, name, key, verse, chorus, preChorus, bridge, minorOr, notes} = this.state;
        //const minor = key.note.includes("m") ? true : false;
        //console.log(this.state.verse)
        //let ogKey = key;
        //console.log(this.props)
        return (
            <div key={id}>
                <h2>{name}</h2>
                <h1>hello world</h1>
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
}

const mapState = (state) => ({ song: state.song });

const mapDispatch = (dispatch, { history }) => ({
    fetchSingleSong: (songId) => {dispatch(fetchSingleSong(songId))}
});
export default connect(mapState, mapDispatch)(SingleSong);



// let notes = {
//     1:"A" ,2:"A#",3:"B",4:"C",5:"C#",6:"D",7:"D#",8:"E",9:"F",10:"F#",11:"G",12:"G#"
//   }
  
//   let verse = "G"
  
//   const transpose = (chord, steps) => {
//     let minor = false;
//     if(chord.includes("m")) {
//       minor = true;
//       chord = chord.slice(0,chord.length-1);
//       console.log(chord);
//     }
//     //console.log(minor);
    
//     console.log(chord);
//     for(let i in notes) {
//       if(notes[i] === chord) {
//         //console.log(i - steps)
//         if(i - steps < 1) {
//           return minor ? notes[i - steps + 12] + "m" : notes[i - steps + 12]
//         }
//         return return minor ? notes[i - steps] + "m" : notes[i - steps]
//       }
//     }
//   }