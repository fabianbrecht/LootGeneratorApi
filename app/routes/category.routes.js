module.exports = app => {
    const categories = require("../controllers/category.controller.js");
  
    // // Create a new Customer
    app.post("/categories", categories.create);
  
    // Retrieve all Customers
    app.get("/categories", categories.findAll);
  
    // Retrieve a single Customer with categoryId
    app.get("/categories/:categoryId", categories.findOne);
  
    // Retrieve a single Customer with categoryId
    app.get("/categoriesBySystem/:systemId", categories.findOneBySystem);
  
    // Update a Customer with categoryId
    app.put("/categories/:categoryId", categories.update);
  
    // // Delete a Customer with categoryId
    app.delete("/categories/:categoryId", categories.delete);
  
    // // Create a new Customer
    // app.delete("/categories", categories.deleteAll);
  };