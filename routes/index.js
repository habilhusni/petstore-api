const express = require("express"),
  router = express.Router(),
  petControl = require("../controllers/petController"),
  userControl = require("../controllers/userController"),
  auth = require("../autentikasi/auth"),
  brandControl = require("../controllers/brandController"),
  categoryControl = require("../controllers/categoryController"),
  productControl = require("../controllers/productController");

// GET '/' /*home page*/ from url
router.get("/", (req, res) => {
  res.render("index", { title: "Pet API" });
});

// POST '/signup' /*signup user*/ from url
router.post("/signup", userControl.signUp);

// POST '/login' /*login user*/ from url
router.post("/login", userControl.login);

// POST '/pet' /*create a pet*/ from url
router.post("/pet", auth.loginAuth, petControl.createPet);

// GET '/pet' /*show all pets*/ from url
router.get("/pet", auth.loginAuth, petControl.getAllPet);

// GET '/pet/:pet_id' /*show one pet*/ from url
router.get("/pet/:pet_id", auth.loginAuth, petControl.getOnePet);

// PUT '/pet/:pet_id' /*update a pet*/ from url
router.put("/pet/:pet_id", auth.loginAuth, petControl.updatePet);

// DELETE '/pet/:pet_id' /*delete a pet*/ from url
router.delete("/pet/:pet_id", auth.loginAuth, petControl.deletePet);

// POST '/pet/:pet_id/uploadImage' /*update photo*/ from url
router.post("/pet/:pet_id/uploadImage", auth.loginAuth, petControl.updatePhoto);

// POST '/brand' /*create brand*/ from url
router.post("/brand", auth.loginAuth, brandControl.createBrand);

// GET '/brand' /*get all brand*/ from url
router.get("/brand", auth.loginAuth, brandControl.getAllBrand);

// GET '/brand/:br_id' /*show one category*/ from url
router.get("/brand/:br_id", auth.loginAuth, brandControl.getOneBrand);

// PUT '/brand/:br_id' /*update a brand*/ from url
router.put("/brand/:br_id", auth.loginAuth, brandControl.updateBrand);

// DELETE '/brand/:br_id' /*delete a brand*/ from url
router.delete("/brand/:br_id", auth.loginAuth, brandControl.deleteBrand);

// POST '/category' /*create category*/ from url
router.post("/category", auth.loginAuth, categoryControl.createCategory);

// GET '/category' /*get all category*/ from url
router.get("/category", auth.loginAuth, categoryControl.getAllCategory);

// GET '/category/:cat_id' /*show one category*/ from url
router.get("/category/:cat_id", auth.loginAuth, categoryControl.getOneCategory);

// PUT '/category/:cat_id' /*update a category*/ from url
router.put("/category/:cat_id", auth.loginAuth, categoryControl.updateCategory);

// DELETE '/category/:cat_id' /*delete a category*/ from url
router.delete(
  "/category/:cat_id",
  auth.loginAuth,
  categoryControl.deleteCategory
);

// POST '/product' /*create product*/ from url
router.post("/product", auth.loginAuth, productControl.createProduct);

// GET '/product' /*get all product*/ from url
router.get("/product", auth.loginAuth, productControl.getAllProduct);

// GET '/product/:prod_id' /*show one product*/ from url
router.get("/product/:prod_id", auth.loginAuth, productControl.getOneProduct);

// PUT '/product/:prod_id' /*update a product*/ from url
router.put("/product/:prod_id", auth.loginAuth, productControl.updateProduct);

// DELETE '/product/:prod_id' /*delete a product*/ from url
router.delete(
  "/product/:prod_id",
  auth.loginAuth,
  productControl.deleteProduct
);

module.exports = router;
