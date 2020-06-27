const Brand = require("../models/brand"),
  helper = require("../utils/helper");

/*
 * Show All Brand
 */
let getAllBrand = (req, res) => {
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
    Brand.findOne({ Id: req.params.br_id })
      .populate("Categories", "-_id -__v -Products -Brands")
      .populate("Products", "-_id -__v -Categories -Brands")
      .exec((err, br) => {
        if (err) {
          res.status(400).send(err);
        } else if (!br) {
          res.status(400).send("cannot find br_id");
        } else {
          res.send(br);
        }
      });
  },
  /*
   * Create a Brand
   */
  createBrand = (req, res) => {
    let brand = new Brand({
      Id: helper.generateUniqueString("brdId"),
      Name: req.body.Name,
      Photos: req.body.Photos,
      Products: req.body.Products,
      Categories: req.body.Categories,
    });

    brand.save((err, br) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.send(br.Id);
      }
    });
  },
  /*
   * Update a Brand
   */
  updateBrand = (req, res) => {
    Brand.findOne({ Id: req.params.br_id }).exec((err, brand) => {
      if (err) {
        res.status(400).send(err);
      } else if (!brand) {
        res.status(400).send("cannot find br_id");
      } else {
        brand.Id = req.body.Id;
        brand.Name = req.body.Name;
        brand.Photos = req.body.Photos;
        brand.Categories = req.body.Categories;
        brand.Products = req.body.Products;
        brand.save(async (err, br) => {
          if (err) {
            res.status(400).send(err);
          } else {
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
    Brand.findOneAndRemove({ Id: req.params.br_id }).exec((err, brand) => {
      if (err) {
        res.status(400).send(err);
      } else if (!brand) {
        res.status(400).send("cannot find br_id");
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
