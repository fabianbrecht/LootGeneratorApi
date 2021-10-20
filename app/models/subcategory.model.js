const sql = require("../db.js");

// constructor
const SubCategory = function(subcategory) {
  this.name = subcategory.name;
  this.category_id = subcategory.categoryId;
  this.description = subcategory.description;
};

SubCategory.create = (newSubCategory, result) => {
  sql.query("INSERT INTO SUBCATEGORY SET ?", newSubCategory, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created subcategory: ", { id: res.insertId, ...newSubCategory });
    result(null, { id: res.insertId, ...newSubCategory });
  });
};

SubCategory.findById = (subcategoryId, result) => {
  sql.query(`SELECT * FROM SUBCATEGORY WHERE id = ${subcategoryId}`, (err, res) => {
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

    // not found SubCategory with the id
    result({ kind: "not_found" }, null);
  });
};

SubCategory.findByCategoryId = (categoryId, result) => {
  sql.query(`SELECT * FROM SUBCATEGORY WHERE category_id = ${categoryId} ORDER BY name`, (err, res) => {
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

    // not found SubCategory with the id
    result({ kind: "not_found" }, null);
  });
};

SubCategory.getAll = result => {
  sql.query("SELECT * FROM `SUBCATEGORY` WHERE 1 ORDER BY name", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("subcategory: ", res);
    result(null, res);
  });
};

SubCategory.updateById = (id, subcategory, result) => {
  sql.query(
    "UPDATE SUBCATEGORY SET name = ?, description = ? WHERE id = ?",
    [subcategory.name, subcategory.description, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found SubCategory with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated subcategory: ", { id: id, ...subcategory });
      result(null, { id: id, ...subcategory });
    }
  );
};

SubCategory.remove = (id, result) => {
  sql.query("DELETE FROM SUBCATEGORY WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found SubCategory with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted subcategory with id: ", id);
    result(null, res);
  });
};

// SubCategory.removeAll = result => {
//   sql.query("DELETE FROM SUBCATEGORY", (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }

//     console.log(`deleted ${res.affectedRows} subcategory`);
//     result(null, res);
//   });
// };

module.exports = SubCategory;
