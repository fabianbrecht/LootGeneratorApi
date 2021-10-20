const Category = require("../models/category.model.js");
const codes = require("../codes.js");

// Create and Save a new Category
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  if (req.body.name === '') {
    res.status(400).send({
      message: "Name can not be empty!"
    });
  }

  if (codes.includes(req.body.code)) {
    // Create a Category
    const category = new Category({
      name: req.body.name,
      system_id: req.body.systemId,
      description: req.body.description,
    });

    // Save Category in the database
    Category.create(category, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Category."
        });
      else res.send(data);
    });
  } else {
    res.status(403).send({
      message: "Forbidden!"
    });
  }
};

// Retrieve all Categories from the database.
exports.findAll = (req, res) => {
    Category.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving Categories."
          });
        else res.send(data);
      });
};

// Find a single Category with a categoryId
exports.findOne = (req, res) => {
  Category.findById(req.params.categoryId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Category with categoryId ${req.params.categoryId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Category with categoryId " + req.params.categoryId
          });
        }
      } else res.send(data);
    });
};

// Find a single Category with a systemId
exports.findOneBySystem = (req, res) => {
    Category.findBySystemId(req.params.systemId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Category with systemId ${req.params.systemId}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Category with systemId " + req.params.systemId
            });
          }
        } else res.send(data);
      });
};

// Update a Category identified by the categoryId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  if (codes.includes(req.body.code)) {
    Category.updateById(
      req.params.categoryId,
      new Category(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Category with id ${req.params.categoryId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Category with id " + req.params.categoryId
            });
          }
        } else res.send(data);
      });
  } else {
    res.status(403).send({
      message: "Forbidden!"
    });
  }
};

// Delete a Category with the specified categoryId in the request
exports.delete = (req, res) => {
  if (codes.includes(req.body.code)) {
    Category.remove(req.params.categoryId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Category with id ${req.params.categoryId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Category with id " + req.params.categoryId
          });
        }
      } else res.send({ message: `Category was deleted successfully!` });
    });
  } else {
    res.status(403).send({
      message: "Forbidden!"
    });
  }
};

// Delete all Categories from the database.
exports.deleteAll = (req, res) => {
    Category.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Categories."
          });
        else res.send({ message: `All Categories were deleted successfully!` });
      });
};
