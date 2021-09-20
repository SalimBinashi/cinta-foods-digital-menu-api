const { getDrinks, getSides, getMains, makeOrder } = require("./meals.controller");

const router = require("express").Router();

// // call the middleware function
// const { authToken } = require("../../auth/token_validator");

router.get("/getMains", getMains);
router.get("/getDrinks", getDrinks);
router.get("/getSides", getSides);
router.get("/makeOrder", makeOrder);


module.exports = router;

