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
    { name: "Song1", key: "Am", intro: null, verse: "Am, Dm, Em", preChorus: "G", chorus: "E#m, Em, Dm", bridge: "G, Am, C"},
    );
    await Songs.create(
      { name: "Song2", key: "Gm", intro: null, verse: "Am, Dm, Em", preChorus: "G", chorus: "E#m, Em, Dm", bridge: "G, Am, C"}
  
    );

    await Songs.create(
      { name: "Song3", key: "D", intro: null, verse: "Am, Dm, Em", preChorus: "G", chorus: "E#m, Em, Dm", bridge: "G, Am, C"}
  
    );
    //await Song.create({ name: "Song2", key: "Am", intro: null, verse: "Am, Dm, Em", preChorus: "Gmaj", chorus: "E#m, Em, Dm", bridge: "Gmaj, Am, Cmaj"});


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
