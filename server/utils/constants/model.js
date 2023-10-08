const article = {
    TITLE_MIN_LEN: 5,
    TITLE_MAX_LEN: 100,
    CONTENT_MIN_LEN: 100,
    CONTENT_MAX_LEN: 3000,
};

const category = {
    NAME_MIN_LEN: 3,
    NAME_MAX_LEN: 30,
};

const cost = {
    TITLE_MIN_LEN: 3,
    TITLE_MAX_LEN: 80,
    PRICE_MIN: 1,
};

const event = {
    TITLE_MIN_LEN: 5,
    TITLE_MAX_LEN: 25,
};

const guest = {
    NAME_MIN_LEN: 1,
    NAME_MAX_LEN: 50,
};

const note = {
    DESC_MIN_LEN: 5,
    DESC_MAX_LEN: 1500,
};

const planner = {
    DESC_MIN_LEN: 4,
    DESC_MAX_LEN: 500,
    LOCATION_MIN_LEN: 4,
    LOCATION_MAX_LEN: 100,
    PRICE_MIN: 1,
};

const subtask = {
    DESC_MIN_LEN: 5,
    DESC_MAX_LEN: 400,
};

const task = {
    TITLE_MIN_LEN: 5,
    TITLE_MAX_LEN: 100,
    DESC_MIN_LEN: 10,
    DESC_MAX_LEN: 500,
};

const user = {
    NAME_MIN_LEN: 1,
    NAME_MAX_LEN: 50,
    PASSWORD_MIN_LEN: 6,
    PASSWORD_MAX_LEN: 50,
};

module.exports = {
    article,
    category,
    cost,
    event,
    guest,
    note,
    planner,
    subtask,
    task,
    user,
};