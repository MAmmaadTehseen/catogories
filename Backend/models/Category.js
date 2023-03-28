const db = require("../database");

module.exports = class Category {
  constructor(name, parent_id) {
    // this.id = id;
    this.name = name;
    this.parent_id = parent_id;
    console.log(typeof name, typeof parent_id);
  }

  save() {
    console.log(this.name, this.parent_id);
    return db.execute(`INSERT INTO Category (name, parent_id) VALUES(?,?)`, [
      this.name,
      this.parent_id,
    ]);
  }

  static updateCategory(id, categoryObj) {
    return db.execute(`UPDATE Category SET name = ? WHERE id= ${id}`, [
      categoryObj.name,
    ]);
  }

  static deleteCategory(id) {
    return db.execute(`SELECT * FROM Category WHERE id = ${id}`).then(([parent]) => {
      db.execute(`SELECT * FROM Category WHERE parent_id=${id}`).then(
        ([rows]) => {
          if (rows.length) {
            // if it is parent of someone...
           return db.execute(`UPDATE Category SET parent_id = ? WHERE parent_id= ${id}`, [
              parent[0].parent_id,
            ]).then(() => {
              return db.execute(`DELETE FROM Category WHERE id = ${id}`);
            });

            console.log(rows);
          } else {
            return db.execute(`DELETE FROM Category WHERE id = ${id}`);
          }
        }
      );
    });

    // return db.execute(`UPDATE Category SET parent_id = ? WHERE id = ${ id }`, [null]).then(() => {
    //   return db.execute(`DELETE FROM Category WHERE id = ${id}`);
    // })
  }

  static fetchAll() {
    return db.execute("SELECT * FROM Category");
  }

  static deleteHelper(id) {
    return db.execute(`SELECT * FROM Category WHERE parent_id=${id}`);
  }

  static deepSearch() {
    return db.execute(`SELECT * FROM Category`).then(([allCategories]) => {
      const rootCategories = Array.from(allCategories).filter(
        (element) => element.parent_id == null
      );
      this.deepSearchHelper(rootCategories, allCategories);
      return rootCategories;
    });
  }

  static deepSearchHelper(categories, allCategories) {
    for (const category of categories) {
      category.children = Array.from(allCategories).filter(
        (element) => element.parent_id == category.id
      );
      if (category.children.length > 0) {
        this.deepSearchHelper(category.children, allCategories);
      }
    }
  }

  static findOne(id) {
    return db.execute(`SELECT * FROM Category WHERE id=${id}`);
  }
};
