const { green, red } = require('chalk');
const { db, 
    models: {
    Songs
}, } = require('../server/db');

const seed = async () => {
  try {
    await db.sync({ force: true });
    // seed your database here!
    await Songs.create(
    { name: "Song1", 
    key: {val: 1, note: "A" , type: "M"}, 
    sections: { 
  
      Verse: {
        name: "Verse", 
        chords: [{val: 1 ,note: "A" , type: "M"}, { val: 6, note :"D", type: "M"}, {val: 8, note:"E", type: "M"}]}, 

      PreChorus: {
        name: "Pre-Chorus",
        chords: [{val: 11, note:"G" , type: null}]
      },

      Chorus: {
        name: "Chorus",
        chords: [{val: 9, note: "F", type: null}, {val: 8, note:"E", type: "M"}, {val: 6, note:"D", type: "M"}]
      }, 

      Bridge: {
        name: "Bridge",
        chords: [{val: 11, note:"G", type: null}, {val: 1, note: "A", type: "M"}, {val: 4, note:"C", type: null}] }},
      }
    );

    await Songs.create(
      { name: "Song2", 
      key: {val: 1, note: "A" , type: "M"}, 
      sections: { 
    
        Intro: {
          name: "Intro",
          chords: [{val: 1 ,note: "A" , type: "M"}]

        },
        Verse: {
          name: "Verse", 
          chords: [{val: 1 ,note: "A" , type: "M"}, { val: 6, note :"D", type: "M"}, {val: 8, note:"E", type: "M"}]}, 
  
  
        Chorus: {
          name: "Chorus",
          chords: [{val: 9, note: "F", type: null}, {val: 8, note:"E", type: "M"}, {val: 6, note:"D", type: "M"}]
        }, 
  
        Bridge: {
          name: "Bridge",
          chords: [{val: 11, note:"G", type: null}, {val: 1, note: "A", type: "M"}, {val: 4, note:"C", type: null}] }},
        }
      );
    // await Songs.create(
    //   { name: "Song2", key: {val: 1, note: "D" , type: "M"}, intro: [null], verse: [{val: 1 ,note: "A" , type: "M"}, { val: 6, note :"D", type: "M"}, {val: 8, note:"E", type: "M"}], preChorus: [{val: 11, note:"G" , type: null}], chorus: [{val: 9, note: "F", type: null}, {val: 8, note:"E", type: "M"}, {val: 6, note:"D", type: "M"}], bridge: [{val: 11, note:"G", type: null}, {val: 1, note: "A", type: "M"}, {val: 4, note:"C", type: null}]},
    //   );

    // await Songs.create(
    //   { name: "Song3", key: {val: 1, note: "F" , type: "M"}, intro: [null], verse: [{val: 1 ,note: "A" , type: "M"}, { val: 6, note :"D", type: "M"}, {val: 8, note:"E", type: "M"}], preChorus: [{val: 11, note:"G" , type: null}], chorus: [{val: 9, note: "F", type: null}, {val: 8, note:"E", type: "M"}, {val: 6, note:"D", type: "M"}], bridge: [{val: 11, note:"G", type: null}, {val: 1, note: "A", type: "M"}, {val: 4, note:"C", type: null}]},
    //   );
    //await Song.create({ name: "Song2", key: "AM", intro: null, verse: "AM, DM, EM", preChorus: "GMaj", chorus: "E#M, Em, Dm", bridge: "Gmaj, Am, Cmaj"});


  } catch (err) {
    console.log(red(err));
  }
};

module.exports = seed;
// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)
if (require.main === module) {
  seed()
    .then(() => {
      console.log(green('Seeding success!'));
      db.close();
    })
    .catch((err) => {
      console.error(red('Oh noes! Something went wrong!'));
      console.error(err);
      db.close();
    })
};
