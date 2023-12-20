const { formatCreatedAt } = require("../parser");

function noteViewModel(note) {
  return {
    id: note._id,
    description: note.description,
    createdAt: formatCreatedAt(note.createdAt),
  };
}

module.exports = {
  noteViewModel,
};
