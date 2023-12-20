const { hasUser } = require("../middlewares/guards");
const {
  allByUserId,
  create,
  getById,
  deleteById,
  update,
  getBudget,
} = require("../services/planners");
const router = require("express").Router();
const { mapErrors } = require("../utils/parser");

router.get("/", hasUser(), async (req, res) => {
  try {
    const userId = req.user._id;
    const planners = await allByUserId(userId);
    res.json(planners);
  } catch (error) {
    const message = mapErrors(error);
    res.status(400).json({ message });
  }
});

router.post("/", hasUser(), async (req, res) => {
  try {
    const userId = req.user._id;
    const planner = await create(
      req.body.description,
      req.body.date,
      req.body.budget,
      req.body.location,
      req.body.bride,
      req.body.groom,
      userId
    );
    res.json(planner);
  } catch (error) {
    const message = mapErrors(error);
    res.status(400).json({ message });
  }
});

router.get("/:id", hasUser(), async (req, res) => {
  try {
    const id = req.params.id;
    const planner = await getById(id, true);
    res.json(planner);
  } catch (error) {
    const message = mapErrors(error);
    res.status(400).json({ message });
  }
});

router.get("/:id/budget", async (req, res) => {
  try {
    const id = req.params.id;
    const budget = await getBudget(id);
    res.json(budget);
  } catch (error) {
    const message = mapErrors(error);
    res.status(400).json({ message });
  }
});

router.delete("/:id", hasUser(), async (req, res) => {
  try {
    const id = req.params.id;
    const planner = await deleteById(id);
    res.json(planner);
  } catch (error) {
    const message = mapErrors(error);
    res.status(400).json({ message });
  }
});

router.put("/:id", hasUser(), async (req, res) => {
  try {
    const id = req.params.id;
    const planner = await update(
      id,
      req.body.description,
      req.body.date,
      req.body.budget,
      req.body.location,
      req.body.bride,
      req.body.brideId,
      req.body.groom,
      req.body.groomId
    );
    res.json(planner);
  } catch (error) {
    const message = mapErrors(error);
    res.status(400).json({ message });
  }
});

module.exports = router;
