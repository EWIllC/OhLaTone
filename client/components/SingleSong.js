import React from "react";
import { connect } from "react-redux";
import { fetchSingleSong } from "../store/singleSong";

class SingleSong extends React.Component {
    constructor() {
        super();

        this.state = {
            //key: this.props.song.key,
            notes: {
                     1:"A" ,2:"A#",3:"B",4:"C",5:"C#",6:"D",7:"D#",8:"E",9:"F",10:"F#",11:"G",12:"G#" 
                },
            key: {},
            verse: {},
            preChorus: {},
            chorus: {},
            bridge: {},
            minorOr: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.chordMapper = this.chordMapper.bind(this);
        this.transmute = this.transmute.bind(this);
    };

    handleChange(event) {
        //console.log(parseInt(Object.keys(this.state.key)))
        //let key = this.state.notes[this.state.key]
        let ogKeyPos = parseInt(Object.keys(this.state.key))
        let newKeyPos = event.target.value

        let steps = ogKeyPos > newKeyPos ? ogKeyPos - newKeyPos : newKeyPos - ogKeyPos

        //console.log(steps)
        const { notes, verse, chorus, preChorus, bridge, minorOr} = this.state;

        let stateKey = minorOr ? {[newKeyPos]: notes[newKeyPos] + "m"} : {[newKeyPos]: notes[newKeyPos] + "m"};
        
        let newVerse = this.transmute(verse, steps);
        let newPreChorus = this.transmute(preChorus, steps);
        let newChorus = this.transmute(chorus, steps);
        let newBirdge = this.transmute(bridge, steps)
        this.setState({
            key: stateKey,
            verse: newVerse,
            preChorus: newPreChorus,
            chorus: newChorus,
            bridge: newBirdge
            // verse: this.chordMapper(verse, steps)
        })
    }

    componentDidMount() {
        this.props.fetchSingleSong(this.props.match.params.songId);
    };

    componentDidUpdate(prevProps) {
        if(prevProps.song !== this.props.song) {
            let { key, verse, preChorus, chorus, bridge} = this.props.song;
            this.setState({
                key: key,
                verse: verse,
                preChorus: preChorus,
                chorus: chorus,
                bridge: bridge,
                minorOr:  this.chordMapper(key).toString().includes("m") ? true : false

            })
        }
    }

    chordMapper(chords, steps = 0) {
        let sec = [];
        //console.log(steps)
        for(let i = 0; i < 12; i++) {
            if(i - steps < 1) {
                sec.push(chords[i - steps + 12]);
            } else {
                sec.push(chords[i - steps]);
            }
        }

        return sec;
    };

    transmute(chords, steps) {
        let hashed = {};
        for(let i in chords) {
            //hashed[this.state.notes[parseInt(i) + steps]]
            if(chords[i].includes("m")) {
                hashed[i] = this.state.notes[parseInt(i) + steps] + "m";
            } else {
                hashed[i] = this.state.notes[parseInt(i) + steps]
            }
            // hashed[i] = this.state.notes[parseInt(i) + steps]
            console.log(hashed)
            //console.log(this.state.notes[parseInt(i) + steps])
            

        }
        //console.log(hashed);
        return hashed;
    }


    render() {

        const { id, name, key, verse, chorus, preChorus, bridge, minorOr} = this.state;
        //const minor = this.chordMapper(key).toString().includes("m") ? true : false;

        //let ogKey = key;
        return (
            <div key={id}>
                <h2>{name}</h2>
                <h3>Key of {this.chordMapper(key).toString().split(",").join(" ")}</h3>
                <p>Transpose</p>
                <select name="transpose" onChange={this.handleChange}>
                    {Object.keys(this.state.notes).map((note, index) => (
                        minorOr ? <option value={index + 1} key={index}>{this.state.notes[note]}m</option> :
                        <option value={index + 1} key={index}>{this.state.notes[note]}</option>
                    ))}
                </select>
                <h4>Verse</h4>
                {this.chordMapper(verse).toString().split(",").join(" ")}
                <h4>PreChorus</h4>
                {this.chordMapper(preChorus).toString().split(",").join(" ")}
                <h4>Chorus</h4>
                {this.chordMapper(chorus).toString().split(",").join(" ")}
                <h4>Bridge</h4>
                {this.chordMapper(bridge).toString().split(",").join(" ")}
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