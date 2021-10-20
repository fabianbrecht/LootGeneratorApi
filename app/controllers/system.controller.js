const System = require("../models/system.model.js");

// Create and Save a new System
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a System
  const system = new System({
    name: req.body.name,
    description: req.body.description,
  });

  // Save System in the database
  System.create(system, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the System."
      });
    else res.send(data);
  });
};

// Retrieve all Systems from the database.
exports.findAll = (req, res) => {
    System.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving Systems."
          });
        else res.send(data);
      });
};

// Find a single System with a systemId
exports.findOne = (req, res) => {
    System.findById(req.params.systemId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found System with id ${req.params.systemId}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving System with id " + req.params.systemId
            });
          }
        } else res.send(data);
      });
};

// Update a System identified by the systemId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

    System.updateById(
        req.params.systemId,
        new System(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found System with id ${req.params.systemId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating System with id " + req.params.systemId
                    });
                }
            } else res.send(data);
        });
};

// Delete a System with the specified systemId in the request
exports.delete = (req, res) => {
    System.remove(req.params.systemId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found System with id ${req.params.systemId}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete System with id " + req.params.systemId
            });
          }
        } else res.send({ message: `System was deleted successfully!` });
      });
};

// Delete all Systems from the database.
exports.deleteAll = (req, res) => {
    System.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Systems."
          });
        else res.send({ message: `All Systems were deleted successfully!` });
      });
};
