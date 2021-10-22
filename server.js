const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');

const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
  origin: ["http://localhost:8080", "https://tabletop-toolkit.com", "https://www.tabletop-toolkit.com"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  preflightContinue: false,
}));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Backend REST API for tabletop-toolkit.com Loot Generator" });
});

require("./app/routes/rarity.routes.js")(app);
require("./app/routes/system.routes.js")(app);
require("./app/routes/category.routes.js")(app);
require("./app/routes/subcategory.routes.js")(app);
require("./app/routes/loot.routes.js")(app);


// set port, listen for requests
app.listen(3001, () => {
  console.log("Server is running on port 3001.");
});
