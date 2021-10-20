const sql = require("../db.js");

// constructor
const Rarity = function(rarity) {
  this.name = rarity.name;
  this.description = rarity.description;
};

// Rarity.create = (newRarity, result) => {
//   sql.query("INSERT INTO RARITY SET ?", newRarity, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(err, null);
//       return;
//     }

//     console.log("created rarity: ", { id: res.insertId, ...newRarity });
//     result(null, { id: res.insertId, ...newRarity });
//   });
// };

Rarity.findById = (rarityId, result) => {
  sql.query(`SELECT * FROM RARITY WHERE id = ${rarityId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found rarity: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Rarity with the id
    result({ kind: "not_found" }, null);
  });
};

Rarity.getAll = result => {
  sql.query("SELECT * FROM `RARITY` WHERE 1 ", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("rarity: ", res);
    result(null, res);
  });
};

// Rarity.updateById = (id, rarity, result) => {
//   sql.query(
//     "UPDATE RARITY SET name = ?, description = ? WHERE id = ?",
//     [rarity.name, rarity.description, id],
//     (err, res) => {
//       if (err) {
//         console.log("error: ", err);
//         result(null, err);
//         return;
//       }

//       if (res.affectedRows == 0) {
//         // not found Rarity with the id
//         result({ kind: "not_found" }, null);
//         return;
//       }

//       console.log("updated rarity: ", { id: id, ...rarity });
//       result(null, { id: id, ...rarity });
//     }
//   );
// };

// Rarity.remove = (id, result) => {
//   sql.query("DELETE FROM RARITY WHERE id = ?", id, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }

//     if (res.affectedRows == 0) {
//       // not found Rarity with the id
//       result({ kind: "not_found" }, null);
//       return;
//     }

//     console.log("deleted rarity with id: ", id);
//     result(null, res);
//   });
// };

// Rarity.removeAll = result => {
//   sql.query("DELETE FROM RARITY", (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }

//     console.log(`deleted ${res.affectedRows} rarity`);
//     result(null, res);
//   });
// };

module.exports = Rarity;
