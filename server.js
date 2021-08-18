function requireHTTPS(req, res, next) {
  // The 'x-forwarded-proto' check is for Heroku
  if (!req.secure && req.get("x-forwarded-proto") !== "https") {
    return res.redirect("https://" + req.get("host") + req.url);
  }
  next();
}
const express = require("express");
const app = express();
// modifier après le ng build
app.use(express.static("./dist/pocketrecettes"));

app.use(requireHTTPS);

app.get("/*", function (req, res) {
  // modifier après le ng build
  res.sendFile("index.html", { root: "dist/pocketrecettes" });
});

app.listen(process.env.PORT || 8080);
