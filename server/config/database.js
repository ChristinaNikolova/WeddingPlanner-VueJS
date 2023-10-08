const mongoose = require('mongoose');
const { messages, errors, important } = require('../utils/constants/global');
require('../models/Article');
require('../models/Category');
require('../models/Cost');
require('../models/Event');
require('../models/Guest');
require('../models/Note');
require('../models/Planner');
require('../models/Subtask');
require('../models/Task');
require('../models/TokenBlacklist');
require('../models/User');

module.exports = async (app) => {
    try {
        await mongoose.connect(important.CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(messages.DATABASE_CONNECTED);

        mongoose.connection.on('error', (err) => {
            console.error(errors.DATABASE);
            console.error(err);
        });
    } catch (err) {
        console.error(errors.DATABASE_CONNECTION);
        process.exit(1);
    }
}