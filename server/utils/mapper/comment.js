function commentViewModel(comment) {
  return {
    id: comment._id,
    content: comment.content,
    creatorId: comment.creator._id,
    creatorName: getFullName(comment.creator),
  };
}

function getFullName(person) {
  return person.firstName + " " + person.lastName;
}

module.exports = {
  commentViewModel,
};
