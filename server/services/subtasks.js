const Subtask = require("../models/Subtask");
const Task = require("../models/Task");
const { subtaskViewModel } = require("../utils/mapper/subtask");

async function create(taskId, description) {
    const subtask = new Subtask({
        description,
    });

    const result = await subtask.save();

    const task = await Task.findById(taskId);
    task.subtasks.push(result._id);
    task.target++;
    await task.save();

    return result;
}

async function done(taskId, subtaskId) {
    const subtask = await Subtask.findById(subtaskId);
    subtask.isDone = !subtask.isDone;
    subtask.save();

    const task = await Task.findById(taskId);
    subtask.isDone ? task.progress++ : task.progress--;
    await task.save();

    return subtask;
}

async function deleteById(taskId, subtaskId) {
    const subtask = await Subtask.findById(subtaskId);

    const task = await Task.findById(taskId);
    task.target--;

    if (subtask.isDone) {
        task.progress--;
    }

    await task.save();

    return Subtask.findByIdAndDelete(subtaskId);
}

async function getById(id, hasToCast) {
    const subtask = await Subtask.findById(id);
    return hasToCast ? subtaskViewModel(subtask) : subtask;
}

async function update(id, description) {
    const subtask = await getById(id, false);

    subtask.description = description;
    await subtask.save();

    return subtask;
}

module.exports = {
    create,
    done,
    deleteById,
    getById,
    update,
}