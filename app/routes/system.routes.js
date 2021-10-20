module.exports = app => {
    const systems = require("../controllers/system.controller.js");
  
    // Create a new Customer
    // app.post("/systems", systems.create);
  
    // Retrieve all Customers
    app.get("/systems", systems.findAll);
  
    // Retrieve a single Customer with systemId
    app.get("/systems/:systemId", systems.findOne);
  
    // Update a Customer with systemId
    // app.put("/systems/:systemId", systems.update);
  
    // Delete a Customer with systemId
    // app.delete("/systems/:systemId", systems.delete);
  
    // Create a new Customer
    // app.delete("/systems", systems.deleteAll);
  };