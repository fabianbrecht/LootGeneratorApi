module.exports = app => {
    const loot = require("../controllers/loot.controller.js");
  
    // // Create a new Customer
    app.post("/loot", loot.create);
  
    // Retrieve all Customers
    app.get("/loot", loot.findAll);
  
    // Retrieve a single Customer with lootId
    app.get("/loot/:lootId", loot.findOne);
  
  // Retrieve a single Customer with lootId
    app.get("/loot/:subcategoryId/:categoryId/:rarityIdMin/:rarityIdMax", loot.findAllBysubCategory);
  
    // Retrieve a single Customer with lootId
    // app.get("/lootByCategory/:categoryId", loot.findOneByCategoryId);
  
    // Update a Customer with lootId
    app.put("/loot/:lootId", loot.update);
  
    // Delete a Customer with lootId
    app.delete("/loot/:lootId", loot.delete);
  
    // // Create a new Customer
    // app.delete("/loot", loot.deleteAll);
  };