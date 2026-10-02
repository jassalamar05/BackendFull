function validatorProduct(req, res, next) {
  const { name, price } = req.body;

  if (!name || !price === undefined) {
    return res.status(400).json({
      message: "all feilds are requied",
    });
  }
  if (typeof price !== "number" && price < 0) {
    return res.status(400).json({
      message: "price is not 0",
    });
  }
  next();
}

module.exports = validatorProduct;
