const sql = require("../db.js");

// constructor
const Category = function(category) {
  this.name = category.name;
  this.system_id = category.system_id;
  this.description = category.description;
};

Category.create = (newCategory, result) => {
  sql.query("INSERT INTO CATEGORY SET ?", newCategory, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created category: ", { id: res.insertId, ...newCategory });
    result(null, { id: res.insertId, ...newCategory });
  });
};

Category.findById = (categoryId, result) => {
  sql.query(`SELECT * FROM CATEGORY WHERE id = ${categoryId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found category: ", res[0]);
      result(null, res);
      return;
    }

    // not found Category with the id
    result({ kind: "not_found" }, null);
  });
};

Category.findBySystemId = (systemId, result) => {
  sql.query(`SELECT * FROM CATEGORY WHERE system_id = ${systemId} ORDER BY name`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found categories: ", res);
      result(null, res);
      return;
    }

    // not found Category with the id
    result({ kind: "not_found" }, null);
  });
};

Category.getAll = result => {
  sql.query("SELECT * FROM `CATEGORY` WHERE 1 ORDER BY name", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("category: ", res);
    result(null, res);
  });
};

Category.updateById = (id, category, result) => {
  sql.query(
    "UPDATE CATEGORY SET name = ?, description = ? WHERE id = ?",
    [category.name, category.description, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Category with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated category: ", { id: id, ...category });
      result(null, { id: id, ...category });
    }
  );
};

Category.remove = (id, result) => {
  sql.query("DELETE FROM CATEGORY WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Category with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted category with id: ", id);
    result(null, res);
  });
};

// Category.removeAll = result => {
//   sql.query("DELETE FROM CATEGORY", (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }

//     console.log(`deleted ${res.affectedRows} category`);
//     result(null, res);
//   });
// };

module.exports = Category;
