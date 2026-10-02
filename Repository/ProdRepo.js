const Product = require("../Model/ProModel");

function createProduct(data) {
  return Product.create(data);
}

function getProduct() {
  return Product.find();
}

function getByProduct(id) {
  return Product.findById(id);
}

function updateProduct(id, data) {
  return Product.findByIdAndUpdate(id, data, {
    returnDocument: "after",
    runValidators: true,
  });
}

function deleteProd(id) {
  return Product.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      returnDocument: "after",
      runValidators: true,
    },
  );
}
module.exports = {
  createProduct,
  getProduct,
  getByProduct,
  updateProduct,
  deleteProd,
};
