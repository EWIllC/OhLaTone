const Sequelize = require("sequelize");
const db = require("../db");

const Songs = db.define("song", {
    name: {
        type: Sequelize.STRING
    },
    key: {
        type: Sequelize.JSON
    },
    sections: {
        type: Sequelize.JSON
    }
    // intro: {
    //     type: Sequelize.JSON
    // },
    // verse: {
    //     type: Sequelize.JSON
    // },
    // preChorus: {
    //     type: Sequelize.JSON
    // },
    // chorus: {
    //     type: Sequelize.JSON
    // },
    // bridge: {
    //     type: Sequelize.JSON
    // }
});

module.exports = Songs;