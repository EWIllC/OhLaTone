const router = require("express").Router({ mergeParams: true});
const {
    models: { Songs }
} = require("../db");

module.exports = router;

router.get("/", async (req, res, next) => {
    try {
        console.log("hit in api route singleSong")
        const song = await Songs.findByPk(req.params.songId);
        res.status(200)
        res.json(song);
    } catch (error) {
        console.log("hit in api error")
        next(error);
    }
})