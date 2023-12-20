const { Schema, model } = require("mongoose");
const { note } = require("../utils/constants/model");

const noteSchema = new Schema(
  {
    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: [
        note.DESC_MIN_LEN,
        `Description should be at least ${note.DESC_MIN_LEN} characters long`,
      ],
      maxlength: [
        note.DESC_MAX_LEN,
        `Description should be maximal ${note.DESC_MAX_LEN} characters long`,
      ],
    },
  },
  {
    timestamps: true,
  }
);

const Note = model("Note", noteSchema);

module.exports = Note;
