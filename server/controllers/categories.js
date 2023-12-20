const router = require("express").Router();
const { all } = require("../services/categories");
const { mapErrors } = require("../utils/parser");

router.get("/", async (req, res) => {
  try {
    const categories = await all();
    res.json(categories);
  } catch (error) {
    const message = mapErrors(error);
    res.status(400).json({ message });
  }
});

module.exports = router;
