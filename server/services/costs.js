const Cost = require("../models/Cost");
const Planner = require("../models/Planner");
const { costViewModel } = require("../utils/mapper/costs");

async function all(plannerId) {
    const planner = await Planner
        .findById(plannerId)
        .populate('costs');

    return planner.costs
        .sort((a, b) => a.title.localeCompare(b.title))
        .map(costViewModel);
}

async function create(plannerId, title, price, category) {
    const cost = new Cost({
        title,
        price: Number(price),
        category,
    });

    const result = await cost.save();

    const planner = await Planner.findById(plannerId);
    planner.costs.push(result._id);
    await planner.save();

    return result;
}

async function deleteById(id) {
    return Cost.findByIdAndDelete(id);
}

async function getById(id, hasToCast) {
    const cost = await Cost.findById(id);
    return hasToCast ? costViewModel(cost) : cost;
}

async function update(id, title, price) {
    const cost = await getById(id, false);

    cost.title = title;
    cost.price = Number(price);

    await cost.save();

    return cost;
}

module.exports = {
    all,
    create,
    deleteById,
    update,
    getById,
}