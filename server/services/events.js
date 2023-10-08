const Event = require("../models/Event");
const Planner = require("../models/Planner");
const { eventViewModel } = require("../utils/mapper/event");

async function all(plannerId) {
    const planner = await Planner
        .findById(plannerId)
        .populate('events');

    return planner.events
        .sort((a, b) => a.startTime - b.startTime)
        .map(eventViewModel);
}

async function create(plannerId, title, startTime, endTime, duration) {
    const event = new Event({
        title,
        startTime,
        endTime,
        duration,
    });

    const result = await event.save();

    const planner = await Planner.findById(plannerId);
    planner.events.push(result._id);
    await planner.save();

    return result;
}

async function heightlight(id) {
    const event = await Event.findById(id);
    event.isHighlighted = !event.isHighlighted;

    return event.save();
}

async function deleteById(id) {
    return Event.findByIdAndDelete(id);
}

async function getById(id, hasToCast) {
    const event = await Event.findById(id);
    return hasToCast ? eventViewModel(event) : event;
}

async function update(id, title, startTime, endTime, duration) {
    const event = await getById(id, false);

    event.title = title;
    event.startTime = startTime;
    event.endTime = endTime;
    event.duration = duration;

    await event.save();

    return event;
}

module.exports = {
    all,
    create,
    heightlight,
    deleteById,
    getById,
    update,
}