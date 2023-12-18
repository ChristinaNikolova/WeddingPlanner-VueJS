export const article = {
  TITLE_MIN_LEN: 5,
  TITLE_MAX_LEN: 100,
  CONTENT_MIN_LEN: 100,
  CONTENT_MAX_LEN: 3000,
};

export const auth = {
  NAME_MIN_LEN: 1,
  NAME_MAX_LEN: 50,
  PASSWORD_MIN_LEN: 6,
  PASSWORD_MAX_LEN: 50,
};

export const category = {
  NAME_MIN_LEN: 3,
  NAME_MAX_LEN: 30,
};

export const comment = {
  CONTENT_MIN_LEN: 10,
  CONTENT_MAX_LEN: 1000,
};

export const cost = {
  TITLE_MIN_LEN: 3,
  TITLE_MAX_LEN: 80,
  PRICE_MIN: 1,
};

export const event = {
  TITLE_MIN_LEN: 5,
  TITLE_MAX_LEN: 25,
};

export const guest = {
  NAME_MIN_LEN: 1,
  NAME_MAX_LEN: 50,
};

export const note = {
  DESC_MIN_LEN: 5,
  DESC_MAX_LEN: 1500,
};

export const planner = {
  DESCRIPTION_MIN_LEN: 4,
  DESCRIPTION_MAX_LEN: 500,
  LOCATION_MIN_LEN: 4,
  LOCATION_MAX_LEN: 100,
  BUDGET_MIN: 1,
  NAME_REGEX: /^[A-Za-z]{1,50}([ ][A-Za-z]{1,50})$/g,
  DATE_REGEX: /^[0-9]{2}.[0-9]{2}.[0-9]{4}$/g,
};

export const subtask = {
  DESC_MIN_LEN: 5,
  DESC_MAX_LEN: 400,
};

export const task = {
  TITLE_MIN_LEN: 5,
  TITLE_MAX_LEN: 100,
  DESC_MIN_LEN: 10,
  DESC_MAX_LEN: 500,
};
