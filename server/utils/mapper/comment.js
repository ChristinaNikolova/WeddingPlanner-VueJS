const { formatCreatedAt } = require("../parser");

function commentViewModel(comment) {
  return {
    id: comment._id,
    content: comment.content,
    creatorId: comment.creator._id,
    creatorName: getFullName(comment.creator),
    likesCount: comment.likes.length,
    likes: comment.likes,
    createdAt: formatCreatedAt(comment.createdAt),
  };
}

function getFullName(person) {
  return person.firstName + " " + person.lastName;
}

module.exports = {
  commentViewModel,
};
