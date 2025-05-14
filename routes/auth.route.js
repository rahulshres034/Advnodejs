const { register, login, logOut } = require("../controller/auth.controller");

const router = require("express").Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logOut);

module.exports = router;
