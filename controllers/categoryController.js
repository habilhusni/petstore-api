const Category = require("../models/category"),
  helper = require("../utils/helper");

/*
 * Show All Category
 */
let getAllCategory = (req, res) => {
    Category.find()
      .populate("Brands", "-_id -__v -Products -Categories")
      .populate("Products", "-_id -__v -Brands -Categories")
      .exec((err, categories) => {
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
    Category.findOne({ Id: req.params.cat_id })
      .populate("Brands", "-_id -__v -Products -Categories")
      .populate("Products", "-_id -__v -Brands -Categories")
      .exec((err, cat) => {
        if (err) {
          res.status(400).send(err);
        } else if (!cat) {
          res.status(400).send("cannot find cat_id");
        } else {
          res.send(cat);
        }
      });
  },
  /*
   * Create a Category
   */
  createCategory = (req, res) => {
    let category = new Category({
      Id: helper.generateUniqueString("catID"),
      Name: req.body.Name,
      Products: req.body.Products,
      Brands: req.body.Brands,
    });

    category.save(async (err, cat) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.send(cat.Id);
      }
    });
  },
  /*
   * Update a Category
   */
  updateCategory = (req, res) => {
    Category.findOne({ Id: req.params.cat_id }).exec((err, category) => {
      if (err) {
        res.status(400).send(err);
      } else if (!category) {
        res.status(400).send("cannot find cat_id");
      } else {
        (category.Id = req.body.Id), (category.Name = req.body.Name);
        category.Brands = req.body.Brands;
        category.Products = req.body.Products;
        category.save((err, cat) => {
          if (err) {
            res.status(400).send(err);
          } else {
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
    Category.findOneAndRemove({ Id: req.params.cat_id }).exec(
      (err, category) => {
        if (err) {
          res.status(400).send(err);
        } else if (!category) {
          res.status(400).send("cannot find cat_id");
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
