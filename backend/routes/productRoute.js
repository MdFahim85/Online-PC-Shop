const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
} = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/products/new").post( isAuthenticatedUser,authorizeRoles("admin"), createProduct);
router
  .route("/product/:id")
  .put( isAuthenticatedUser,authorizeRoles("admin"), updateProduct)
  .delete( isAuthenticatedUser,authorizeRoles("admin"), deleteProduct)
  .get(getProduct);
module.exports = router;
