const productRepo = require("../Repository/ProdRepo");

function createProduct(data) {
  return productRepo.createProduct(data);
}

function getProduct() {
  return productRepo.getProduct();
}

function getSingleProduct(id) {
  return productRepo.getByProduct(id);
}

function updateProduct(id, data) {
  return productRepo.updateProduct(id, data);
}

function deleteProduct(id) {
  return productRepo.deleteProd(id);
}
module.exports = {
  createProduct,
  getProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
