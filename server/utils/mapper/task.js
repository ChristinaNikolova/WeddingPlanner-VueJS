const { subtaskViewModel } = require("./subtask");

function taskViewModel(task) {
    return {
        id: task._id,
        title: task.title,
        description: task.description,
        timespan: task.timespan,
        progress: task.progress,
        target: task.target,
        subtasks: task.subtasks.map(subtaskViewModel),
    }
}

module.exports = {
    taskViewModel,
}