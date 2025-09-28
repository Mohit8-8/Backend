const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");
const blog = require("./routers/blog");
app.use(express.static("public"));


app.use('/blog',blog)

// Middleware 1
app.use((req, res, next) => {
  fs.appendFileSync(
    "log.txt",
    `${Date.now()} - ${req.method} request to ${req.url}\n`,
    { flag: "a" }
  );
  console.log("Middleware 1 executed");
  console.log(`${Date.now()} is a ${req.method} request`);
  next();
});

// Middleware 2
app.use((req, res, next) => {
  console.log("Middleware 2 executed");
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/contact", (req, res) => {
  res.send("Hello contact!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
