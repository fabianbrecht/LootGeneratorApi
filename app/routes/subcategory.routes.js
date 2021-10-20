module.exports = app => {
    const sucategories = require("../controllers/subcategory.controller.js");
  
    // // Create a new Customer
    app.post("/subcategories", sucategories.create);
  
    // Retrieve all Customers
    app.get("/subcategories", sucategories.findAll);
  
    // Retrieve a single Customer with subcategoryId
    app.get("/subcategories/:subcategoryId", sucategories.findOne);
  
    // Retrieve a single Customer with subcategoryId
    app.get("/subcategoriesByCategory/:categoryId", sucategories.findOneByCategoryId);
  
    // Update a Customer with subcategoryId
    app.put("/subcategories/:subcategoryId", sucategories.update);
  
    // Delete a Customer with subcategoryId
    app.delete("/subcategories/:subcategoryId", sucategories.delete);
  
    // // Create a new Customer
    // app.delete("/sucategories", sucategories.deleteAll);
  };