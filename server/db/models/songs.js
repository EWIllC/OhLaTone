const Sequelize = require("sequelize");
const db = require("../db");

const Songs = db.define("song", {
    name: {
        type: Sequelize.STRING
    },
    key: {
        type: Sequelize.TEXT
    },
    intro: {
        type: Sequelize.TEXT
    },
    verse: {
        type: Sequelize.TEXT
    },
    preChorus: {
        type: Sequelize.TEXT
    },
    chorus: {
        type: Sequelize.TEXT
    },
    bridge: {
        type: Sequelize.TEXT
    }
});

module.exports = Songs;