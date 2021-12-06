const db = require("./db");
const Songs = require("./models/songs")

module.exports = {
    db, 
    models: {
        Songs
    },
};