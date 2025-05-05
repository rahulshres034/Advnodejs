const { register, login } = require("../controller/auth.controller");

const router = require("express").Router();

router.route("/register").post(register);
router.route("/login").post(login);

module.exports = router;
