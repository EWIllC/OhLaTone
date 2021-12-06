const router = require("express").Router();
const {
    models: { Songs }
} = require("../db");

module.exports = router;

router.get("/", async (req, res, next) => {
    try {
        console.log("hit in api route")
        const songs = await Songs.findAll();
        res.json(songs);
    } catch (error) {
        console.log("hit in api error")
        next(error);
    }
})