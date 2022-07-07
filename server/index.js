const express = require("express");
const app = express();
const mongoConnector = require('./database/mongo')
const http = require("http");
const bodyParser = require("body-parser");
const cors = require("cors");

const AuthRoute = require("./routes/auth");

var corsOptions = {
  origin: "http://example.com",
  optionsSuccessStatus: 200
};

app.set("port", process.env.PORT || 5000);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
mongoConnector()
app.use("/api", cors(), AuthRoute);
app.use(cors(corsOptions));

if (process.env.NODE_ENV !== "test") {
  const server = http.createServer(app);
  server.listen(app.get("port"), () => {
    console.log("Server is running at port %s", app.get("port"));
  });
}
