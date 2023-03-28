const Category = require("../models/Category");

const addCategory = (req, res, next) => {
  try {
    console.log(req.body);
    let { name, parent_id } = req.body;
    console.log(req.body.parent_id)
    if (!parent_id) {
      parent_id = null;
    }
    const categoryObj = new Category(name, parent_id);
    categoryObj.save().then(() => {
      res.status(201).json({
        success:true,
        message: "created Successfully!!!",
      });
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const getCategories = (req, res, next) => {
  Category.fetchAll().then(([rows, fields]) => {
    res.status(200).json(rows);
  });
};

const updateCategory = (req, res, next) => {
  try {
    Category.updateCategory(req.params.id, req.body).then(() => {
      res
        .status(201)
        .json({ success: true, message: "Updated Successfully!!!" });
    });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};

const deleteCategory = (req, res, next) => {
  try {
    Category.deleteCategory(req.params.id).then(() => {
      res.status(200).json({success:true, message: "deleted Successfully!!!"})
    }).catch(err => {console.log(err.message)})
    // Category.deleteCategory(req.params.id).then(() => {
    //   res
    //     .status(200)
    //     .json({ success: true, message: "deleted successfully!!!" });
    // });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};

const deepSearch = (req, res, next) => {
  Category.deepSearch().then((data) => {
    res.status(200).json(data);
  });
};

const getCategory = (req, res, next) => {
  try {
    Category.findOne(req.params.id).then(([rows]) => {
      res.status(200).json(rows[0])
    })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  addCategory,
  getCategories,
  updateCategory,
  deleteCategory,
  deepSearch,
  getCategory
};
