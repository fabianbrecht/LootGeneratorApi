const sql = require("../db.js");

// constructor
const System = function(system) {
  this.name = system.name;
  this.description = system.description;
  this.active = system.active;
};

// System.create = (newSystem, result) => {
//   sql.query("INSERT INTO SYSTEM SET ?", newSystem, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(err, null);
//       return;
//     }

//     console.log("created system: ", { id: res.insertId, ...newSystem });
//     result(null, { id: res.insertId, ...newSystem });
//   });
// };

System.findById = (systemId, result) => {
  sql.query(`SELECT * FROM SYSTEM WHERE id = ${systemId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found system: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found System with the id
    result({ kind: "not_found" }, null);
  });
};

System.getAll = result => {
  sql.query("SELECT * FROM `SYSTEM` WHERE 1 ORDER BY sorting", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("system: ", res);
    result(null, res);
  });
};

// System.updateById = (id, system, result) => {
//   sql.query(
//     "UPDATE SYSTEM SET name = ?, description = ? WHERE id = ?",
//     [system.name, system.description, id],
//     (err, res) => {
//       if (err) {
//         console.log("error: ", err);
//         result(null, err);
//         return;
//       }

//       if (res.affectedRows == 0) {
//         // not found System with the id
//         result({ kind: "not_found" }, null);
//         return;
//       }

//       console.log("updated system: ", { id: id, ...system });
//       result(null, { id: id, ...system });
//     }
//   );
// };

// System.remove = (id, result) => {
//   sql.query("DELETE FROM SYSTEM WHERE id = ?", id, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }

//     if (res.affectedRows == 0) {
//       // not found System with the id
//       result({ kind: "not_found" }, null);
//       return;
//     }

//     console.log("deleted system with id: ", id);
//     result(null, res);
//   });
// };

// System.removeAll = result => {
//   sql.query("DELETE FROM SYSTEM", (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }

//     console.log(`deleted ${res.affectedRows} system`);
//     result(null, res);
//   });
// };

module.exports = System;
