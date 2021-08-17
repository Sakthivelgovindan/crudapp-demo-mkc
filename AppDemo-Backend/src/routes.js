const express = require("express");

const LogIn = require("./controller/LogIn/logIn");
const LogOut = require("./controller/LogOut/logOut");

const GetProduct = require("./controller/Product/getProduct");
const AddProduct = require("./controller/Product/addProduct");
const DeleteProduct = require("./controller/Product/deleteProduct");
const UpdateProduct = require("./controller/Product/updateProduct");

//Initialize Routes
const router = express.Router();

//Route Status
router.get("/", (req, res, next) => {
  res.send("Route is working😀.........");
});


router.post("/login", LogIn.logIn);
router.post("/logout", LogOut.logOut);

router.post("/add-product", AddProduct.addProduct);
router.get("/get-product", GetProduct.getProduct);
router.get("/get-product/:productId", GetProduct.getProduct);
router.put("/update-product", UpdateProduct.updateProduct);
router.delete("/delete-product", DeleteProduct.deleteProduct);


module.exports = router;