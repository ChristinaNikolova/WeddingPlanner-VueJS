const express = require("express");
const databaseConfig = require("./config/database");
const expressConfig = require("./config/express");
const routesConfig = require("./config/routes");
const { messages } = require("./utils/constants/global");

start();

async function start() {
  const app = express();

  expressConfig(app);
  await databaseConfig(app);
  routesConfig(app);

  app.listen(3030, () => console.log(messages.REST_STARTED));
}
