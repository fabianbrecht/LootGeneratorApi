const Loot = require("../models/loot.model.js");
const codes = require("../codes.js");

// Create and Save a new Loot
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

  console.log("Request:");
  console.log(req);

  // Create a Loot
  const loot = new Loot(
    req.body.name,
    req.body.description,
    req.body.subCategoryId,
    req.body.rarityId,
    null,
    null,
    null,
    false,
    req.body.tags
  );

  console.log("Loot:");
  console.log(loot);

  // Save Loot in the database
  Loot.create(loot, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Loot."
      });
    else res.send(data);
  });
};

// Retrieve all Loot from the database.
exports.findAll = (req, res) => {
    Loot.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving Loot."
          });
        else res.send(data);
      });
};


exports.findAllBysubCategory = (req, res) => {
  Loot.getAllBySubCategoryId(req.params, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Loot with subcategoryId ${req.params.subcategoryId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Loot with subcategoryId " + req.params.subcategoryId
        });
      }
    } else res.send(data);
  });
};

// Find a single Loot with an id
exports.findOne = (req, res) => {
  Loot.findById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Loot with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Loot with id " + req.params.id
          });
        }
      } else res.send(data);
    });
};

// Update a Loot identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  if (codes.includes(req.body.code)) {
    Loot.updateById(
        req.params.id,
        new Loot(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Loot with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Loot with id " + req.params.id
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

// Delete a Loot with the specified id in the request
  exports.delete = (req, res) => {
    if (codes.includes(req.body.code)) {
      Loot.remove(req.params.id, (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found Loot with id ${req.params.id}.`
              });
            } else {
              res.status(500).send({
                message: "Could not delete Loot with id " + req.params.id
              });
            }
          } else res.send({ message: `Loot was deleted successfully!` });
      });
    } else {
      res.status(403).send({
        message: "Forbidden!"
      });
    }
};

// Delete all Categories from the database.
exports.deleteAll = (req, res) => {
    Loot.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Categories."
          });
        else res.send({ message: `All Categories were deleted successfully!` });
      });
};
