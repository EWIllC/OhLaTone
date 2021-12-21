const router = require("express").Router();
const {
    models: { Songs }
} = require("../db");

module.exports = router;

router.get("/", async (req, res, next) => {
    try {
        const songs = await Songs.findAll();

        res.status(200);
        res.json(songs);

    } catch (error) {
        next(error);
    };
});

router.post("/", async (req, res, next) => {
    try {

      res.json(await Songs.create(req.body));
      res.status(201);

    } catch (error) {

      next(error);

    };
  });
