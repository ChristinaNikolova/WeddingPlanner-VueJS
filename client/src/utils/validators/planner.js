import { planner } from '../constants/model';

function hasTwoNames(value) {
  return value.match(planner.NAME_REGEX);
};

function validDate(value) {
  return value.match(planner.DATE_REGEX);
};

export default {
  hasTwoNames,
  validDate,
};
