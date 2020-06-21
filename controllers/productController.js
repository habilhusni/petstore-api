const Product = require("../models/product"),
  helper = require("../utils/helper");

/*
 * Show All Product
 */
let getAllProduct = (req, res) => {
    Product.find()
      .populate("Categories", "-_id -__v -Products -Brands")
      .populate("Brands", "-_id -__v -Products -Categories")
      .exec((err, products) => {
        if (err) {
          res.status(400).send(err);
        } else {
          res.send(products);
        }
      });
  },
  /*
   * Show One Product
   */
  getOneProduct = (req, res) => {
    Product.findOne({ Id: req.params.prod_id })
      .populate("Categories", "-_id -__v -Products -Brands")
      .populate("Brands", "-_id -__v -Products -Categories")
      .exec((err, prod) => {
        if (err) {
          res.status(400).send(err);
        } else if (!prod) {
          res.status(400).send("cannot find prod_id");
        } else {
          res.send(prod);
        }
      });
  },
  /*
   * Create a Product
   */
  createProduct = (req, res) => {
    let product = new Product({
      Id: helper.generateUniqueString("prdId"),
      Name: req.body.Name,
      Brands: req.body.Brands,
      Categories: req.body.Categories,
      Pictures: req.body.Pictures,
      Price: req.body.Price,
      Description: req.body.Description,
      PetType: req.body.PetType,
    });

    product.save((err, prod) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.send(prod.Id);
      }
    });
  },
  /*
   * Update a Product
   */
  updateProduct = (req, res) => {
    Product.findOne({ Id: req.params.prod_id }).exec((err, product) => {
      if (err) {
        res.status(400).send(err);
      } else if (!product) {
        res.status(400).send("cannot find prod_id");
      } else {
        product.Id = req.body.Id;
        product.Name = req.body.Name;
        product.Categories = req.body.Categories;
        product.Brands = req.body.Brands;
        product.Pictures = req.body.Pictures;
        product.Price = req.body.Price;
        product.Description = req.body.Description;
        product.PetType = req.body.PetType;
        product.save((err, prod) => {
          if (err) {
            res.status(400).send(err);
          } else {
            res.send(prod);
          }
        });
      }
    });
  },
  /*
   * Delete a Product
   */
  deleteProduct = (req, res) => {
    Product.findOneAndRemove({ Id: req.params.prod_id }).exec((err, prod) => {
      if (err) {
        res.status(400).send(err);
      } else if (!prod) {
        res.status(400).send("cannot find prod_id");
      } else {
        res.send(prod);
      }
    });
  };

module.exports = {
  getAllProduct,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
