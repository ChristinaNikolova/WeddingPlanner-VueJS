const router = require("express").Router();
const { mapErrors } = require("../utils/parser");
const {
  all,
  create,
  deleteById,
  getById,
  update,
} = require("../services/tasks");
const { hasUser } = require("../middlewares/guards");

router.get("/:id", hasUser(), async (req, res) => {
  try {
    const plannerId = req.params.id;
    const tasks = await all(plannerId);
    res.json(tasks);
  } catch (error) {
    const message = mapErrors(error);
    res.status(400).json({ message });
  }
});

router.post("/:id", hasUser(), async (req, res) => {
  try {
    const plannerId = req.params.id;
    const task = await create(
      plannerId,
      req.body.title,
      req.body.description,
      req.body.timespan
    );
    res.json(task);
  } catch (error) {
    const message = mapErrors(error);
    res.status(400).json({ message });
  }
});

router.delete("/:id", hasUser(), async (req, res) => {
  try {
    const id = req.params.id;
    const task = await deleteById(id);
    res.json(task);
  } catch (error) {
    const message = mapErrors(error);
    res.status(400).json({ message });
  }
});

router.put("/:id", hasUser(), async (req, res) => {
  try {
    const id = req.params.id;
    const task = await update(id, req.body.title, req.body.description);
    res.json(task);
  } catch (error) {
    const message = mapErrors(error);
    res.status(400).json({ message });
  }
});

router.get("/:plannerId/:taskId", hasUser(), async (req, res) => {
  try {
    const id = req.params.taskId;
    const task = await getById(id, true);
    res.json(task);
  } catch (error) {
    const message = mapErrors(error);
    res.status(400).json({ message });
  }
});

module.exports = router;
