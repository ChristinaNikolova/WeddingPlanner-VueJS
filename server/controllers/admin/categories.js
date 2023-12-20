const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const { isAdmin } = require("../../middlewares/guards");
const {
  create,
  deleteById,
  getById,
  update,
} = require("../../services/categories");
const { mapErrors } = require("../../utils/parser");
const {
  category,
  errors: globalErrors,
} = require("../../utils/constants/global");

router.post(
  "/",
  isAdmin(),
  body("image").isURL().withMessage(globalErrors.INVALID_URL),
  async (req, res) => {
    try {
      const { errors } = validationResult(req);

      if (errors.length > 0) {
        throw mapErrors(errors);
      }

      const category = await create(req.body.name, req.body.image);
      res.json(category);
    } catch (error) {
      const message = mapErrors(error);
      res.status(400).json({ message });
    }
  }
);

router.put(
  "/:id",
  isAdmin(),
  body("image").isURL().withMessage(globalErrors.INVALID_URL),
  async (req, res) => {
    try {
      const { errors } = validationResult(req);

      if (errors.length > 0) {
        throw mapErrors(errors);
      }

      const id = req.params.id;
      const category = await update(id, req.body.name, req.body.image);
      res.json(category);
    } catch (error) {
      const message = mapErrors(error);
      res.status(400).json({ message });
    }
  }
);

router.delete("/:id", isAdmin(), async (req, res) => {
  try {
    const id = req.params.id;

    if (id === category.DEFAULT_CATEGORY_SELECTED_ID) {
      return;
    }

    await deleteById(id);
    res.status(204).end();
  } catch (error) {
    const message = mapErrors(error);
    res.status(400).json({ message });
  }
});

router.get("/:id", isAdmin(), async (req, res) => {
  try {
    const id = req.params.id;
    const category = await getById(id);
    res.json(category);
  } catch (error) {
    const message = mapErrors(error);
    res.status(400).json({ message });
  }
});

module.exports = router;
