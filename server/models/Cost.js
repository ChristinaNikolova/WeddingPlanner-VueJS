const {
  Schema,
  model,
  Types: { ObjectId },
} = require("mongoose");
const { cost } = require("../utils/constants/model");

const costSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    minlength: [
      cost.TITLE_MIN_LEN,
      `Title should be at least ${cost.TITLE_MIN_LEN} characters long`,
    ],
    maxlength: [
      cost.TITLE_MAX_LEN,
      `Title should be maximal ${cost.TITLE_MAX_LEN} characters long`,
    ],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [cost.PRICE_MIN, "Price should be a positive number"],
  },
  category: {
    type: ObjectId,
    ref: "Category",
    required: true,
  },
});

const Cost = model("Cost", costSchema);

module.exports = Cost;
