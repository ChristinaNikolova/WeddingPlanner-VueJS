const { Schema, model } = require("mongoose");
const { subtask } = require("../utils/constants/model");

const subtaskSchema = new Schema(
  {
    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: [
        subtask.DESC_MIN_LEN,
        `Description should be at least ${subtask.DESC_MIN_LEN} characters long`,
      ],
      maxlength: [
        subtask.DESC_MAX_LEN,
        `Description should be maximal ${subtask.DESC_MAX_LEN} characters long`,
      ],
    },
    isDone: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Subtask = model("Subtask", subtaskSchema);

module.exports = Subtask;
