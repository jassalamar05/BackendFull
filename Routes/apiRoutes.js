const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProduct,
  getSingleProd,
  updatePro,
  deletepRD,
} = require("../Controller/ProdController");
const validatorProduct = require("../Validators/Prod.validators");

router.post("/add", createProduct, validatorProduct);
router.get("/get", getProduct);
router.get("/getid/:id", getSingleProd);
router.put("/update/:id", updatePro, validatorProduct);
router.delete("/delete/:id", deletepRD);
module.exports = router;

// function apiRoutes(req, res) {

//     if (req.method === "POST" && req.url === "/users") {

//         let body = "";

//         req.on("data", (chunk) => {
//             body += chunk;
//         });

//         req.on("end", () => {

//             console.log(body);

//             res.end("Data received");
//         });
//     }
// }

// module.exports = apiRoutes;
