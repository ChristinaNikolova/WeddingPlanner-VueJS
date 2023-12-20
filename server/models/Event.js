const { Schema, model } = require("mongoose");
const { event } = require("../utils/constants/model");

const eventSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    minlength: [
      event.TITLE_MIN_LEN,
      `Title should be at least ${event.TITLE_MIN_LEN} characters long`,
    ],
    maxlength: [
      event.TITLE_MAX_LEN,
      `Title should be maximal ${event.TITLE_MAX_LEN} characters long`,
    ],
  },
  startTime: {
    type: Date,
    required: [true, "Start time is required"],
  },
  endTime: {
    type: Date,
    required: [true, "End time is required"],
  },
  duration: {
    type: String,
    default: "",
  },
  isHighlighted: {
    type: Boolean,
    default: false,
  },
});

const Event = model("Event", eventSchema);

module.exports = Event;
