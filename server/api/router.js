const express = require("express");
const router = express.Router();
const controller = require("./controllers");

router.get("/", controller.getProducts);
router.get('/:productId', controller.getProductById);

module.exports = router;
