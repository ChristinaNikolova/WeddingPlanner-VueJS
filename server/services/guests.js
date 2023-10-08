const Guest = require("../models/Guest");
const Planner = require("../models/Planner");
const { guestViewModel } = require("../utils/mapper/guest");

async function all(plannerId) {
    const planner = await Planner
        .findById(plannerId)
        .populate('guests');

    return planner.guests.map(guestViewModel);
}

async function create(firstName, lastName, gender, age, side, role, table, mainDish, confirmed, plannerId) {
    const guest = new Guest({
        firstName,
        lastName,
        gender,
        age,
        side,
        role,
        table,
        mainDish,
        confirmed: confirmed,
    });

    const result = await guest.save();

    if (plannerId) {
        const planner = await Planner.findById(plannerId);
        planner.guests.push(result._id);
        await planner.save();
    }

    return result;
}

async function update(id, firstName, lastName, gender, age, side, role, table, mainDish, confirmed) {
    const guest = await getById(id, false);

    guest.firstName = firstName;
    guest.lastName = lastName;
    guest.gender = gender;
    guest.age = age;
    guest.side = side;
    guest.role = role;
    guest.table = table;
    guest.mainDish = mainDish;
    guest.confirmed = confirmed;

    await guest.save();

    return guest;
}

async function getById(id, hasToCast) {
    const guest = await Guest.findById(id);
    return hasToCast ? guestViewModel(guest) : guest;
}

async function deleteById(id) {
    return Guest.findByIdAndDelete(id);
}

module.exports = {
    create,
    update,
    all,
    deleteById,
    getById,
}