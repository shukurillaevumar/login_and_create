const express = require("express");
const v1UserRouter = require("./v1/routes/user.router");
const dbConnect = require("./v1/database/db.connections");

const app = express();

//Adding routes
app.use("/api/v1/users", v1UserRouter);
// const PORT = process.env.PORT || 3000;
const PORT = 3000;

dbConnect();

app.get("/", (req, res) => {
  res.send("<h2>It's Working!</h2>");
});

app.post("/", (req, res) => {
  res.send(req.body);
});

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});
