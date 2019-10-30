const express = require("express"); // importing a CommonJS module
const helmet = require("helmet");
const morgan = require("morgan");

const hubsRouter = require("./hubs/hubs-router.js");
const dateLogger = require("./dataLogger-middlware.js");

const server = express();

// the three amigos

function logger(req, res, next) {
  console.log(
    `The Logger: [${new Date().toISOString()}] ${req.method} to ${req.url}`
  );
  next();
}

function gateKeeper(req, res, next) {
  // data can come in the body, url parameters, query string, headers
  // new way of reader data sent by the client
  // req.body only works on POST / PUT requests; headers work with GET as well
  const password = req.headers.password || "";
  if (password == "") {
    res.status(400).json({
      message: "You shall not pass"
    });
  } else if (password.toLowerCase() === "mellon") {
    next();
  } else {
    res.status(401).json({
      message: "Wrong password, you shall not pass"
    });
  }

  // if (password) {

  //   if (password.toLowerCase() === "mellon") {
  //     next();
  //   } else {
  //     res.status(400).json({
  //       you: "cannot pass!"
  //     });
  //   }
  // }
}

// global middleware

server.use(helmet()); // 3rd party middleware
server.use(express.json()); // built-in middleware
server.use(gateKeeper);
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
