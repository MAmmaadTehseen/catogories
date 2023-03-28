const router = require("express").Router();
const { addCategory, getCategories, updateCategory, deleteCategory, deepSearch, getCategory } = require("../controller/category");


router.post("/addCategory", addCategory)

router.get("/getCategories", getCategories)

router.get("/getCategory/:id", getCategory)

router.get("/deepSearch", deepSearch)

router.put("/updateCategory/:id", updateCategory)

router.delete("/deleteCategory/:id", deleteCategory)


module.exports = router;