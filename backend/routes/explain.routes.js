const express = require("express");
const router = express.Router();
const { explainCode } = require("../controllers/explain.controller");

router.post("/", explainCode);

module.exports = router;