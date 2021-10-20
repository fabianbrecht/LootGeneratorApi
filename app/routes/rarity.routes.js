module.exports = app => {
    const rarities = require("../controllers/rarity.controller.js");
  
    // Create a new Customer
    // app.post("/rarities", rarities.create);
  
    // Retrieve all Customers
    app.get("/rarities", rarities.findAll);
  
    // Retrieve a single Customer with rarityId
    app.get("/rarities/:rarityId", rarities.findOne);
  
    // Update a Customer with rarityId
    // app.put("/rarities/:rarityId", rarities.update);
  
    // Delete a Customer with rarityId
    // app.delete("/rarities/:rarityId", rarities.delete);
  
    // Create a new Customer
    // app.delete("/rarities", rarities.deleteAll);
  };