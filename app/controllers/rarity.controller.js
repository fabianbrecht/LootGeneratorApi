const Rarity = require("../models/rarity.model.js");

// Create and Save a new Rarity
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Rarity
  const rarity = new Rarity({
    name: req.body.name,
    description: req.body.description,
  });

  // Save Rarity in the database
  Rarity.create(rarity, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Rarity."
      });
    else res.send(data);
  });
};

// Retrieve all Raritys from the database.
exports.findAll = (req, res) => {
    Rarity.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving Raritys."
          });
        else res.send(data);
      });
};

// Find a single Rarity with a rarityId
exports.findOne = (req, res) => {
    Rarity.findById(req.params.rarityId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Rarity with id ${req.params.rarityId}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Rarity with id " + req.params.rarityId
            });
          }
        } else res.send(data);
      });
};

// Update a Rarity identified by the rarityId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

    Rarity.updateById(
        req.params.rarityId,
        new Rarity(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Rarity with id ${req.params.rarityId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Rarity with id " + req.params.rarityId
                    });
                }
            } else res.send(data);
        });
};

// Delete a Rarity with the specified rarityId in the request
exports.delete = (req, res) => {
    Rarity.remove(req.params.rarityId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Rarity with id ${req.params.rarityId}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete Rarity with id " + req.params.rarityId
            });
          }
        } else res.send({ message: `Rarity was deleted successfully!` });
      });
};

// Delete all Raritys from the database.
exports.deleteAll = (req, res) => {
    Rarity.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Raritys."
          });
        else res.send({ message: `All Raritys were deleted successfully!` });
      });
};
