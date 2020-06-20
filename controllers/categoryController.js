const Category = require("../models/category");

/*
 * Show All Category
 */
let getAllCategory = (req, res) => {
    Category.find((err, categories) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.send(categories);
      }
    });
  },
  /*
   * Show One Category
   */
  getOneCategory = (req, res) => {
    Category.findOne({ Name: req.params.cat_name }).exec((err, cat) => {
      if (err) {
        res.status(400).send(err);
      } else if (!cat) {
        res.status(400).send("cannot find cat_name");
      } else {
        res.send(cat);
      }
    });
  },
  /*
   * Populate Brands
   */
  populateBrands = (id) => {
    Category.findById(id).populate("Brands", "-_id -__v -Products -Categories");
  },
  /*
   * Populate Products
   */
  populateProducts = (id) => {
    Category.findById(id).populate("Products", "-_id -__v -Categories -Brands");
  },
  /*
   * Create a Category
   */
  createCategory = (req, res) => {
    let category = new Category({
      Name: req.body.Name,
      Products: req.body.Products,
      Brands: req.body.Brands,
    });

    category.save(async (err, cat) => {
      if (err) {
        res.status(400).send(err);
      } else {
        if (cat.Brands.length > 0) {
          await populateBrands(cat._id);
        }
        if (cat.Products.length > 0) {
          await populateProducts(cat_id);
        }

        res.send(cat);
      }
    });
  },
  /*
   * Update a Category
   */
  updateCategory = (req, res) => {
    Category.findOne({ Name: req.params.cat_name }).exec((err, category) => {
      if (err) {
        res.status(400).send(err);
      } else if (!category) {
        res.status(400).send("cannot find cat_name");
      } else {
        category.Name = req.body.Name;
        category.Brands = req.body.Brands;
        category.Products = req.body.Products;
        category.save(async (err, cat) => {
          if (err) {
            res.status(400).send(err);
          } else {
            if (cat.Categories.length > 0) {
              await populateCategories(cat._id);
            }
            if (cat.Products.length > 0) {
              await populateProducts(cat._id);
            }
            res.send(cat);
          }
        });
      }
    });
  },
  /*
   * Delete a Category
   */
  deleteCategory = (req, res) => {
    Category.findOneAndRemove({ Name: req.params.cat_name }).exec(
      (err, category) => {
        if (err) {
          res.status(400).send(err);
        } else if (!category) {
          res.status(400).send("cannot find cat_name");
        } else {
          res.send(category);
        }
      }
    );
  };

module.exports = {
  getAllCategory,
  getOneCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
