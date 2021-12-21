const router = require("express").Router({ mergeParams: true});
const {
    models: { Songs }
} = require("../db");

module.exports = router;

router.get("/", async (req, res, next) => {
    try {
        const song = await Songs.findByPk(req.params.songId);

        res.status(200);
        res.json(song);

    } catch (error) {
        
        next(error);

    };
});

router.put("/", async (req, res, next) => {
    try {
        console.log(req.params, "~~~~")
        const songFound = await Songs.findByPk(req.params.songId);
        
        res.status(204);
        res.json(await songFound.update(req.body));

    } catch (error) {

        next(error);

    };
});