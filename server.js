const express = require("express"); // importing a CommonJS module
const helmet = require("helmet");
const morgan = require("morgan");

const hubsRouter = require("./hubs/hubs-router.js");

const server = express();

// the three amigos
function dateLogger(req, res, next) {
  console.log(new Date().toISOString());
  next();
}

function logger(req, res, next) {
  console.log(
    `The Logger: [${new Date().toISOString()}] ${req.method} to ${req.url}`
  );
  next();
}

// global middleware
server.use(helmet()); // 3rd party middleware
server.use(express.json()); // built-in middleware
server.use(dateLogger);
server.use(logger);
server.use(morgan("dev"));

server.use("/api/hubs", hubsRouter);

server.get("/", (req, res) => {
  const nameInsert = req.name ? ` ${req.name}` : "";

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

module.exports = server;
