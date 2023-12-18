const router = require("express").Router();
const { hasUser } = require("../middlewares/guards");
const { mapErrors } = require("../utils/parser");
const { create, all, like, deleteById } = require("../services/comments");

router.post("/:id", hasUser(), async (req, res) => {
  try {
    const userId = req.user._id;
    const articleId = req.params.id;
    const comment = await create(articleId, userId, req.body.content);
    res.json(comment);
  } catch (error) {
    const message = mapErrors(error);
    res.status(400).json({ message });
  }
});

router.get("/:id", hasUser(), async (req, res) => {
  try {
    const articleId = req.params.id;
    const comments = await all(articleId);
    res.json(comments);
  } catch (error) {
    const message = mapErrors(error);
    res.status(400).json({ message });
  }
});

router.post("/like/:id", hasUser(), async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user._id;

    const comment = await like(id, userId);
    res.json(comment);
  } catch (error) {
    const message = mapErrors(error);
    res.status(400).json({ message });
  }
});

router.delete("/:id", hasUser(), async (req, res) => {
  try {
    const id = req.params.id;
    const comment = await deleteById(id);
    res.json(comment);
  } catch (error) {
    const message = mapErrors(error);
    res.status(400).json({ message });
  }
});

module.exports = router;
