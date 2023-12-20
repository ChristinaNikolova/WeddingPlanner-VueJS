const { messages } = require("../utils/constants/global");
const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({ message: messages.REST_OPERATED });
});

module.exports = router;
