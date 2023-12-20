const {
  Schema,
  model,
  Types: { ObjectId },
} = require("mongoose");
const { planner } = require("../utils/constants/model");

const DATE_PATTERN = /^[0-9]{2}.[0-9]{2}.[0-9]{4}$/;

const plannerSchema = new Schema(
  {
    title: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      minlength: [
        planner.DESC_MIN_LEN,
        `Description should be at least ${planner.DESC_MIN_LEN} characters long`,
      ],
      maxlength: [
        planner.DESC_MAX_LEN,
        `Description should be maximal ${planner.DESC_MAX_LEN} characters long`,
      ],
    },
    date: {
      type: String,
      required: [true, "Date is required"],
      match: [DATE_PATTERN, "Date should be in format DD.MM.YYYY"],
    },
    budget: {
      type: Number,
      required: [true, "Budget is required"],
      min: [planner.PRICE_MIN, "Budget should be a positive number"],
    },
    location: {
      type: String,
      minlength: [
        planner.LOCATION_MIN_LEN,
        `Location should be at least ${planner.LOCATION_MIN_LEN} characters long`,
      ],
      maxlength: [
        planner.LOCATION_MAX_LEN,
        `Location should be maximal ${planner.LOCATION_MAX_LEN} characters long`,
      ],
    },
    bride: {
      type: ObjectId,
      ref: "Guest",
      required: true,
    },
    groom: {
      type: ObjectId,
      ref: "Guest",
      required: true,
    },
    creator: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    notes: {
      type: [ObjectId],
      ref: "Note",
      default: [],
    },
    guests: {
      type: [ObjectId],
      ref: "Guest",
      default: [],
    },
    tasks: {
      type: [ObjectId],
      ref: "Task",
      default: [],
    },
    costs: {
      type: [ObjectId],
      ref: "Cost",
      default: [],
    },
    events: {
      type: [ObjectId],
      ref: "Event",
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Planner = model("Planner", plannerSchema);

module.exports = Planner;
