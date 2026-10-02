const prodServices = require("../Services/ProdServices");

const createProduct = async (req, res, next) => {
  try {
    const data = await prodServices.createProduct(req.body);

    return res.status(201).json({
      message: "pro added",
      data: data,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

// get product
const getProduct = async (req, res, next) => {
  try {
    const get = await prodServices.getProduct();

    return res.status(200).json({
      message: "whole data is here",
      data: get,
    });
  } catch (err) {
    console.log(err);
    next();
  }
};

const getSingleProd = async (req, res, next) => {
  try {
    const getId = await prodServices.getSingleProduct(req.params.id);

    return res.status(200).json({
      message: "singel prod dekhla",
      data: getId,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

// updating the part of the contorller model

const updatePro = async (req, res, next) => {
  try {
    const updateProd = await prodServices.updateProduct(
      req.params.id,
      req.body,
    );

    return res.status(201).json({
      message: "updated data",
      data: updateProd,
    });
  } catch (err) {
    next(err);
  }
};

const deletepRD = async (req, res, next) => {
  try {
    const deleteProduct = await prodServices.deleteProduct(req.params.id);

    return res.status(200).json({
      message: "productde is deleted",
      data: deleteProduct,
    });
  } catch (err) {
    next(err);
  }
};
module.exports = {
  createProduct,
  getProduct,
  getSingleProd,
  updatePro,
  deletepRD,
};
