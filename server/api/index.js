const router = require("express").Router();
module.exports = router;

router.use("/songs", require("./songs.js"));
router.use("/singleSong", require("./singleSong"))

router.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
  });
  