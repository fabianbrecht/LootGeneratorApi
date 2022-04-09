const sql = require("../db.js");

// constructor
function Loot(loot) {
  this.name = loot.name;
  this.description = loot.description;
  this.subcategory_id = loot.subCategoryId;
  this.rarity_id = loot.rarity_id;
  this.image_path = null;
  this.approved = false;
  this.tags = loot.tags;
};

function Loot(name, description, subcategory_id, rarity_id, image_path, approved, tags) {
  this.name = name;
  this.description = description;
  this.subcategory_id = subcategory_id;
  this.rarity_id = rarity_id;
  this.image_path = null;
  this.approved = false;
  this.tags = tags;
};

function Loot(name, description, subcategory_id, rarity_id, rarity_idMin, rarity_idMax, image_path, approved, tags) {
  this.name = name;
  this.description = description;
  this.subcategory_id = subcategory_id;
  this.rarity_id = rarity_id;
  this.rarity_idMin = rarity_idMin;
  this.rarity_idMax = rarity_idMax;
  this.image_path = image_path;
  this.approved = approved;
  this.tags = tags;
};

Loot.create = (newLoot, result) => {
  sql.query("INSERT INTO LOOT SET ?", newLoot, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created loot: ", { id: res.insertId, ...newLoot });
    result(null, { id: res.insertId, ...newLoot });
  });
};

Loot.findById = (lootId, result) => {
  sql.query(`SELECT * FROM LOOT WHERE id = ${lootId}`, (err, res) => {
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

    // not found Loot with the id
    result({ kind: "not_found" }, null);
  });
};

// Loot.findByCategoryId = (categoryId, result) => {
//   sql.query(`SELECT * FROM LOOT WHERE category_id = ${categoryId} ORDER BY name`, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(err, null);
//       return;
//     }

//     if (res.length) {
//       console.log("found categories: ", res);
//       result(null, res);
//       return;
//     }

//     // not found Loot with the id
//     result({ kind: "not_found" }, null);
//   });
// };

Loot.getAll = result => {
  sql.query("SELECT * FROM `LOOT` WHERE 1 ORDER BY name", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("loot: ", res);
    result(null, res);
  });
};

Loot.getAllBySubCategoryId = (params, result) => {
  var query = ``;
  if (params.subcategoryId == 0) { 
    query = `SELECT l.name, l.description FROM LOOT as l, SUBCATEGORY as s WHERE l.subcategory_id IN (SELECT s.id FROM SUBCATEGORY WHERE s.category_id = ${params.categoryId}) AND l.rarity_id BETWEEN ${params.rarityIdMin} AND ${params.rarityIdMax} AND l.approved = true`;
  } else {
    query = `SELECT * FROM LOOT WHERE subcategory_id = ${params.subcategoryId} AND rarity_id BETWEEN ${params.rarityIdMin} AND ${params.rarityIdMax} AND approved = true`;
  }
  console.log(query);

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("loot: ", res);
    result(null, res);
  });
};

Loot.updateById = (id, loot, result) => {
  sql.query(
    "UPDATE LOOT SET name = ?, description = ?, subcategory_id, rarity_id, approved, tags WHERE id = ?",
    [loot.name, loot.description, loot.subcategory_id, loot.rarity_id, loot.approved, loot.tags, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Loot with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated loot: ", { id: id, ...loot });
      result(null, { id: id, ...loot });
    }
  );
};

Loot.remove = (id, result) => {
  sql.query("DELETE FROM LOOT WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Loot with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted loot with id: ", id);
    result(null, res);
  });
};

// Loot.removeAll = result => {
//   sql.query("DELETE FROM LOOT", (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }

//     console.log(`deleted ${res.affectedRows} loot`);
//     result(null, res);
//   });
// };

module.exports = Loot;
