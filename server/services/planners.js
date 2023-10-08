const { Types: { ObjectId } } = require('mongoose');
const Planner = require("../models/Planner");
const { plannerLinkViewModel, plannerViewModel } = require("../utils/mapper/planner");
const { create: createGuest, update: updateGuest } = require('./guests');

async function allByUserId(userId) {
    return (await Planner
        .find({ creator: new ObjectId(userId) })
        .sort({ createdAt: -1 }))
        .map(plannerLinkViewModel);
}

async function create(description, date, budget, location, bride, groom, userId) {
    const [brideFirstName, brideLastName] = splitName(bride);
    const brideAsGuestResult = await createGuest(brideFirstName, brideLastName, 'female', 'adult', 'bride', 'bride', '', 'no info', true);

    const [groomFirstName, groomLastName] = splitName(groom);
    const groomAsGuestResult = await createGuest(groomFirstName, groomLastName, 'male', 'adult', 'groom', 'groom', '', 'no info', true);

    const planner = new Planner({
        title: `${bride} & ${groom}`,
        description,
        date,
        budget: Number(budget),
        location,
        bride: brideAsGuestResult._id,
        groom: groomAsGuestResult._id,
        creator: userId,
    });

    await planner.save();

    planner.guests.push(brideAsGuestResult._id);
    planner.guests.push(groomAsGuestResult._id);

    await planner.save();

    return planner;
}

async function getById(id, hasToCast) {
    const planner = await Planner
        .findById(id)
        .populate('bride', 'firstName lastName')
        .populate('groom', 'firstName lastName')
        .populate('guests', 'confirmed side')
        .populate('costs', 'price')
        .populate({
            path: 'tasks',
            populate: {
                path: 'subtasks',
            }
        })
        .populate('notes')
        .populate('events', 'isHighlighted');

    return hasToCast ? plannerViewModel(planner) : planner;
}

async function deleteById(id) {
    return Planner.findByIdAndDelete(id);
}

async function update(id, description, date, budget, location, bride, brideId, groom, groomId) {
    const planner = await getById(id, false);

    const [brideFirstName, brideLastName] = splitName(bride);
    await updateGuest(brideId, brideFirstName, brideLastName, 'female', 'adult', 'bride', 'bride', '', 'no info', true);

    const [groomFirstName, groomLastName] = splitName(groom);
    await updateGuest(groomId, groomFirstName, groomLastName, 'male', 'adult', 'groom', 'groom', '', 'no info', true);

    planner.title = `${bride} & ${groom}`;
    planner.description = description;
    planner.date = date;
    planner.budget = Number(budget);
    planner.location = location;
    planner.description = description;

    await planner.save();

    return planner;
}

function splitName(name) {
    return name
        .split(' ')
        .map((n) => n.trim());
}

module.exports = {
    allByUserId,
    create,
    getById,
    deleteById,
    update,
}