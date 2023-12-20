const Planner = require("../models/Planner");
const Task = require("../models/Task");
const { taskViewModel } = require("../utils/mapper/task");

async function all(plannerId) {
  const planner = await Planner.findById(plannerId).populate({
    path: "tasks",
    populate: {
      path: "subtasks",
      options: {
        sort: { createdAt: -1 },
      },
    },
  });

  return planner.tasks
    .sort((a, b) => b.createdAt - a.createdAt)
    .map(taskViewModel);
}

async function create(plannerId, title, description, timespan) {
  const task = new Task({
    title,
    description,
    timespan,
  });

  const result = await task.save();

  const planner = await Planner.findById(plannerId);
  planner.tasks.push(result._id);
  await planner.save();

  return result;
}

async function deleteById(id) {
  return Task.findByIdAndDelete(id);
}

async function getById(id, hasToCast) {
  const task = await Task.findById(id);
  return hasToCast ? taskViewModel(task) : task;
}

async function update(id, title, description) {
  const task = await getById(id, false);

  task.title = title;
  task.description = description;

  await task.save();

  return task;
}

module.exports = {
  all,
  create,
  deleteById,
  getById,
  update,
};
