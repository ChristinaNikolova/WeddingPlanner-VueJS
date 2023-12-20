function plannerLinkViewModel(planner) {
  return {
    id: planner._id,
    title: planner.title,
  };
}

function plannerViewModel(planner) {
  return {
    id: planner._id,
    title: planner.title,
    description: planner.description,
    date: planner.date,
    budget: planner.budget.toFixed(2),
    bride: getFullName(planner.bride),
    brideId: planner.bride._id,
    groom: getFullName(planner.groom),
    groomId: planner.groom._id,
    location: planner.location,
    actualCosts: calculateActualCosts(planner.costs),
    totalGuests: planner.guests.length,
    brideGuests: getSideGuestsCount(planner.guests, "bride"),
    groomGuests: getSideGuestsCount(planner.guests, "groom"),
    confirmedGuests: getConfirmedGuestsCount(planner.guests),
    totalTasks: getTotalTasks(planner.tasks),
    totalDoneTasks: getTotalDoneTasks(planner.tasks),
    totalEvents: planner.events.length,
    highlightedEvents: getHighlightedEventsCount(planner.events),
    notes: planner.notes.length,
  };
}

function getTotalTasks(tasks) {
  const result = tasks.reduce((acc, curr) => {
    return (acc += curr.subtasks.length);
  }, 0);

  return result;
}

function getTotalDoneTasks(tasks) {
  const result = tasks.reduce((acc, curr) => {
    return (acc += curr.subtasks.filter((s) => s.isDone).length);
  }, 0);

  return result;
}

function getHighlightedEventsCount(events) {
  return events.filter((e) => e.isHighlighted).length;
}

function getConfirmedGuestsCount(guests) {
  return guests.filter((g) => g.confirmed).length;
}

function getSideGuestsCount(guests, side) {
  return guests.filter((g) => g.side === side).length;
}

function getFullName(person) {
  return person.firstName + " " + person.lastName;
}

function calculateActualCosts(costs) {
  return costs.reduce((acc, curr) => curr.price + acc, 0).toFixed(2);
}

module.exports = {
  plannerLinkViewModel,
  plannerViewModel,
};
