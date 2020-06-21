const express = require("express"),
  router = express.Router(),
  petControl = require("../controllers/petController"),
  userControl = require("../controllers/userController"),
  auth = require("../autentikasi/auth"),
  brandControl = require("../controllers/brandController"),
  categoryControl = require("../controllers/categoryController");

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

// GET '/brand/:br_name' /*show one category*/ from url
router.get("/brand/:br_name", auth.loginAuth, brandControl.getOneBrand);

// PUT '/brand/:br_name' /*update a brand*/ from url
router.put("/brand/:br_name", auth.loginAuth, brandControl.updateBrand);

// DELETE '/brand/:br_name' /*delete a brand*/ from url
router.put("/brand/:br_name", auth.loginAuth, brandControl.deleteBrand);

// POST '/category' /*create category*/ from url
router.post("/category", auth.loginAuth, categoryControl.createCategory);

// GET '/category' /*get all category*/ from url
router.get("/category", auth.loginAuth, categoryControl.getAllCategory);

// GET '/category/:cat_name' /*show one category*/ from url
router.get(
  "/category/:cat_name",
  auth.loginAuth,
  categoryControl.getOneCategory
);

// PUT '/category/:cat_name' /*update a category*/ from url
router.put(
  "/category/:cat_name",
  auth.loginAuth,
  categoryControl.updateCategory
);

// DELETE '/category/:cat_name' /*delete a category*/ from url
router.put(
  "/category/:cat_name",
  auth.loginAuth,
  categoryControl.deleteCategory
);

module.exports = router;
