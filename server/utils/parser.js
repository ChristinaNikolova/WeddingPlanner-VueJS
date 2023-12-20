const { errors } = require("./constants/global");

function mapErrors(err) {
  if (Array.isArray(err)) {
    return err;
  } else if (err.name == "ValidationError") {
    return Object.values(err.errors).map((e) => ({ msg: e.message }));
  } else if (typeof err.message == "string") {
    return [{ msg: err.message }];
  } else {
    return [{ msg: errors.REQUEST }];
  }
}

function formatCreatedAt(createdAt) {
  return (
    createdAt.getDate() +
    "/" +
    (createdAt.getMonth() + 1) +
    "/" +
    createdAt.getFullYear().toString().substr(-2)
  );
}

function extractTimeFromDate(date) {
  let time = date.toLocaleTimeString();
  time = time.split(" ")[0];
  time = time.slice(0, time.lastIndexOf(":"));

  return time;
}

function getTotalMinutes(duration) {
  const [hours, minutes] = duration.split(":");
  const result = Number(hours) * 60 + Number(minutes);

  return result;
}

module.exports = {
  mapErrors,
  formatCreatedAt,
  extractTimeFromDate,
  getTotalMinutes,
};
