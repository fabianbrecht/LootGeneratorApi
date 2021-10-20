const SubCategory = require("../models/subcategory.model.js");
const codes = require("../codes.js");

// Create and Save a new SubCategory
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
    // Create a SubCategory
    const subcategory = new SubCategory({
      name: req.body.name,
      categoryId: req.body.categoryId,
      description: req.body.description,
    });

    // Save SubCategory in the database
    SubCategory.create(subcategory, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the SubCategory."
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
    SubCategory.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving Categories."
          });
        else res.send(data);
      });
};

// Find a single SubCategory with a csubategoryId
exports.findOne = (req, res) => {
  SubCategory.findById(req.params.subcategoryId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found SubCategory with subcategoryId ${req.params.subcategoryId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving SubCategory with subcategoryId " + req.params.subcategoryId
          });
        }
      } else res.send(data);
    });
};

// Find a single SubCategory with a categoryId
exports.findOneByCategoryId = (req, res) => {
    SubCategory.findByCategoryId(req.params.categoryId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found SubCategory with categoryId ${req.params.categoryId}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving SubCategory with categoryId " + req.params.categoryId
            });
          }
        } else res.send(data);
      });
};

// Update a SubCategory identified by the subcategoryId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  if (codes.includes(req.body.code)) {
    SubCategory.updateById(
        req.params.subcategoryId,
        new SubCategory(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found SubCategory with id ${req.params.subcategoryId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating SubCategory with id " + req.params.subcategoryId
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

// Delete a SubCategory with the specified subcategoryId in the request
  exports.delete = (req, res) => {
    if (codes.includes(req.body.code)) {
      SubCategory.remove(req.params.subcategoryId, (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found SubCategory with id ${req.params.subcategoryId}.`
              });
            } else {
              res.status(500).send({
                message: "Could not delete SubCategory with id " + req.params.subcategoryId
              });
            }
          } else res.send({ message: `SubCategory was deleted successfully!` });
      });
    } else {
      res.status(403).send({
        message: "Forbidden!"
      });
    }
};

// Delete all Categories from the database.
exports.deleteAll = (req, res) => {
    SubCategory.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Categories."
          });
        else res.send({ message: `All Categories were deleted successfully!` });
      });
};
