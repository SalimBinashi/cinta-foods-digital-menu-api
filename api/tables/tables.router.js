const {
    getTables,
    updateTableStatus,
    login,
  } = require("./tables.controller");

const router = require("express").Router();

router.get("/getTables", getTables);
router.patch("/updateTable", updateTableStatus);
router.post("/login", login);

module.exports = router;
