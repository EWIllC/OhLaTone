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
            sections: {},
            keyArray: []

        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.newSection = this.newSection.bind(this);
        this.mapper = this.mapper.bind(this);
        this.handleOrder = this.handleOrder.bind(this);

    };

    handleChange(event) {
        
        const { sections } = this.state;

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
            let chord = {};
            chord.note = event.target.value
            this.setState({
                sections: {...sections,
                    [event.target.name]: {
                        name: event.target.name,
                        chords: [chord]
                    }
                }
            });
        }
    };

    handleSubmit(event) {

        event.preventDefault();


        const { songName, key, sections } = this.state;


        const keyArray = Object.keys(sections);

        //make a hash table for unifoom chords
        let uniformChords = {};

        console.log(sections)
        
        keyArray.map((section) => (
            sections[section].chords.map((chord, index) => {
                
                if(chord.type) {

                    if(index < sections[section].chords.length - 1) {
                        console.log("worked")
                        chord.type += ","
                    };

                    if(uniformChords[section]) {

                        if(uniformChords[section].note) {

                            uniformChords[section].note += chord.note + chord.type;

                        } else {

                            uniformChords[section] = {note: chord.note + chord.type};
                            
                        };

                    } else {

                        uniformChords[section] = {note: chord.note + chord.type};

                    };
                    
                };

                if(!chord.type) {

                    if(index < sections[section].chords.length - 1) {
                        chord.note += ","
                    };

                    if(uniformChords[section]) {

                        if(uniformChords[section].note) {

                            uniformChords[section].note += chord.note;

                        } else {

                            uniformChords[section] = {note: chord.note};

                        };

                    } else {

                        uniformChords[section] = {note: chord.note};
                    };
                };
            })
        )).join();

        //console.log(uniformChords)

        const sectionsHash = {};

        
        keyArray.map((section) => {
            return sectionsHash[section] = { name: section, chords: this.newSection(uniformChords[section].note) };
        });
        // Object.keys(sections).map((section) => {
           
        //         return sectionsHash[section] = { name: `${sections[section].name}`, chords: [...sections[section].chords,this.newSection(sections[section])] }}
                
        // );

        if(!this.state.notes[key[0]]) {
            alert("song needs a valid key");
        };


        const newSong = {
            id: this.props.song.id,
            name: songName,
            key: this.newSection(key.toUpperCase())[0],
            sections: sectionsHash
        };
        
        //console.log(newSong)
        this.props.editSong(newSong);
        this.props.history.push("/songs");
    };

    newSection(section) {

        const{ notes } = this.state;
        
        // the key is just a string while the sections are stored in an object "note", in an array to make
        // the mappping of notes consistent with initial object.
        //section = typeof(section) === "string" ? section : section.chords[0].note;

        const spaceless = section.replace(/\s/g, '').toUpperCase();

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

    handleOrder(direction ,event) {
        event.preventDefault();

        const { keyArray } = this.state;
        
        const currentIndex = keyArray.indexOf(event.target.name)

        const indexToBeSwapped = direction === "down" ?
        currentIndex + 1 :
        currentIndex - 1;

        if(direction === "down") {
            if(indexToBeSwapped >= keyArray.length) {
                console.log("error")
            } else {
                const swapped = keyArray[currentIndex];
                keyArray[currentIndex] = keyArray[indexToBeSwapped];
                keyArray[indexToBeSwapped] = swapped;
                
                this.setState({
                    keyArray: keyArray
                });
            };
        };

        if(direction === "up") {
            if(indexToBeSwapped < 0) {
                console.log("error")
            } else {
                const swapped = keyArray[currentIndex];
                keyArray[currentIndex] = keyArray[indexToBeSwapped];
                keyArray[indexToBeSwapped] = swapped;
                
                this.setState({
                    keyArray: keyArray
                })
            }
        }
    };

    componentDidMount() {

        this.props.fetchSingleSong(this.props.match.params.songId);

    };

    componentDidUpdate(prevProps, prevState) {

        if(prevProps.song !== this.props.song) {

            let {name, key, sections} = this.props.song;

            this.setState({
                songName: name,
                key: key.type ? key.note + key.type.toLowerCase() : key.note,
                sections: sections,
                keyArray: Object.keys(sections)
            })
        };

    };
    

    render() {

        const { songName, key, sections, keyArray } = this.state;

        return (
            
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

                    {keyArray.map((section) => {


                    return (

                        <div key={sections[section].name}>
                            <h4>{sections[section].name}

                            <button onClick={(event) => this.handleOrder("up", event)} name={`${sections[section].name}`}>^</button>
                            <button onClick={(event) => this.handleOrder("down", event)} name={`${sections[section].name}`}>v</button>
                            </h4>

                            <input
                            className ="songForm"
                            type="text"
                            name={sections[section].name}
                            value={sections[section].chords.map((chord) => (chord.type ?
                                 chord.note + chord.type.toLowerCase() :
                                  chord.note))}
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

const mapState = (state) => ({ song: state.song });

const mapDispatch = (dispatch, { history }) => ({

    fetchSingleSong: (songId) => {dispatch(fetchSingleSong(songId))},

    editSong: (song) => (dispatch(editSong(song)))

});

export default connect(mapState, mapDispatch)(EditSong);