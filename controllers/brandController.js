const Brand = require("../models/brand");

/*
 * Show All Brand
 */
let getAllBrand = (req, res) => {
    // Brand.find((err, brands) => {
    //   if (err) {
    //     res.status(400).send(err);
    //   } else {
    //     res.send(brands);
    //   }
    // });
    Brand.find()
      .populate("Categories", "-_id -__v -Products -Brands")
      .populate("Products", "-_id -__v -Categories -Brands")
      .exec((err, brands) => {
        if (err) {
          res.status(400).send(err);
        } else {
          res.send(brands);
        }
      });
  },
  /*
   * Show One Brand
   */
  getOneBrand = (req, res) => {
    Brand.findOne({ Name: req.params.br_name }).exec((err, br) => {
      if (err) {
        res.status(400).send(err);
      } else if (!br) {
        res.status(400).send("cannot find br_name");
      } else {
        res.send(br);
      }
    });
  },
  /*
   * Populate Categories
   */
  populateCategories = (id) => {
    Brand.findById(id).populate("Categories", "-_id -__v -Products -Brands");
  },
  /*
   * Populate Products
   */
  populateProducts = (id) => {
    Brand.findById(id).populate("Products", "-_id -__v -Categories -Brands");
  },
  /*
   * Create a Brand
   */
  createBrand = (req, res) => {
    let brand = new Brand({
      Name: req.body.Name,
      Products: req.body.Products,
      Categories: req.body.Categories,
    });

    brand.save(async (err, br) => {
      if (err) {
        res.status(400).send(err);
      } else {
        if (br.Categories.length > 0) {
          await populateCategories(br._id);
        }
        if (br.Products.length > 0) {
          await populateProducts(br_id);
        }

        res.send(br);
      }
    });
  },
  /*
   * Update a Brand
   */
  updateBrand = (req, res) => {
    Brand.findOne({ Name: req.params.br_name }).exec((err, brand) => {
      if (err) {
        res.status(400).send(err);
      } else if (!brand) {
        res.status(400).send("cannot find br_name");
      } else {
        brand.Name = req.body.Name;
        brand.Categories = req.body.Categories;
        brand.Products = req.body.Products;
        brand.save(async (err, br) => {
          if (err) {
            res.status(400).send(err);
          } else {
            if (br.Categories.length > 0) {
              await populateCategories(br._id);
            }
            if (br.Products.length > 0) {
              await populateProducts(br._id);
            }
            res.send(br);
          }
        });
      }
    });
  },
  /*
   * Delete a Brand
   */
  deleteBrand = (req, res) => {
    Brand.findOneAndRemove({ Name: req.params.br_name }).exec((err, brand) => {
      if (err) {
        res.status(400).send(err);
      } else if (!brand) {
        res.status(400).send("cannot find br_name");
      } else {
        res.send(brand);
      }
    });
  };

module.exports = {
  getAllBrand,
  getOneBrand,
  createBrand,
  updateBrand,
  deleteBrand,
};
