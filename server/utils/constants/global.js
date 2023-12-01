const important = {
    CONNECTION_STRING: 'mongodb://localhost:27017/weddingplanner',
    SECRET: 'my-very-secret',
};

const category = {
    DEFAULT_CATEGORY_SELECTED_ID: '638325c6bdd58333840dcc7e',
};

const pagination = {
    ARTICLES_PER_PAGE: 3,
};

const emails = {
    ADMIN: 'admin@weddingplanner.com',
};

const messages = {
    REST_STARTED: 'REST service started',
    REST_OPERATED: 'REST service operational',
    DATABASE_CONNECTED: 'Database connected',
};

const errors = {
    REQUEST: 'Request error',
    INVALID_URL: 'Invalid url',
    INVALID_EMAIL: 'Invalid email',
    PASSWORD(min, max) {
        return `Password should be between ${min} and ${max} characters long`;
    },
    SELECT_CATEGORY: 'Please select category',
    NAME_TAKEN: 'Name is already taken',
    TITEL_TAKEN: 'Title is already taken',
    EMAIL_TAKEN: 'Email is already taken',
    LOGIN: 'Incorrect email or password',
    NOT_LOGGED_IN: 'Please log in',
    ALREADY_LOGGED_IN: 'You are already logged in',
    TOKEN_EXIST: 'Token is blacklisted',
    TOKEN_INVALID: 'Invalid authorization token',
    DATABASE: 'Database error',
    DATABASE_CONNECTION: 'Error connecting to database',
};

module.exports = {
    important,
    category,
    pagination,
    emails,
    messages,
    errors,
};