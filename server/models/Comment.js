const {
  Schema,
  model,
  Types: { ObjectId },
} = require("mongoose");
const { comment } = require("../utils/constants/model");

const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: [true, "Content is required"],
      minlength: [
        comment.CONTENT_MIN_LEN,
        `Content should be at least ${comment.CONTENT_MIN_LEN} characters long`,
      ],
      maxlength: [
        comment.CONTENT_MAX_LEN,
        `Content should be maximal ${comment.CONTENT_MAX_LEN} characters long`,
      ],
    },
    creator: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    likes: {
      type: [ObjectId],
      ref: "User",
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Comment = model("Comment", commentSchema);

module.exports = Comment;
