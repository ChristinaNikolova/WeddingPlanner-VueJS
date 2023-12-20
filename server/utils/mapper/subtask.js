function subtaskViewModel(subtask) {
  return {
    id: subtask._id,
    description: subtask.description,
    isDone: subtask.isDone,
  };
}

module.exports = {
  subtaskViewModel,
};
