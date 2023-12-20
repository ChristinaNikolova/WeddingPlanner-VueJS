const router = require("express").Router();
const { hasUser } = require("../middlewares/guards");
const {
  all,
  create,
  deleteById,
  update,
  getById,
} = require("../services/notes");
const { mapErrors } = require("../utils/parser");

router.get("/:id", hasUser(), async (req, res) => {
  try {
    const plannerId = req.params.id;
    const notes = await all(plannerId);
    res.json(notes);
  } catch (error) {
    const message = mapErrors(error);
    res.status(400).json({ message });
  }
});

router.post("/:id", hasUser(), async (req, res) => {
  try {
    const plannerId = req.params.id;
    const note = await create(plannerId, req.body.description);
    res.json(note);
  } catch (error) {
    const message = mapErrors(error);
    res.status(400).json({ message });
  }
});

router.delete("/:id", hasUser(), async (req, res) => {
  try {
    const id = req.params.id;
    const note = await deleteById(id);
    res.json(note);
  } catch (error) {
    const message = mapErrors(error);
    res.status(400).json({ message });
  }
});

router.put("/:id", hasUser(), async (req, res) => {
  try {
    const id = req.params.id;
    const note = await update(id, req.body.description);
    res.json(note);
  } catch (error) {
    const message = mapErrors(error);
    res.status(400).json({ message });
  }
});

router.get("/:plannerId/:noteId", hasUser(), async (req, res) => {
  try {
    const id = req.params.noteId;
    const note = await getById(id, true);
    res.json(note);
  } catch (error) {
    const message = mapErrors(error);
    res.status(400).json({ message });
  }
});

module.exports = router;
