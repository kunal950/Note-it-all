const { register, login, getUser } = require("../controllers/auth.user");
const router = require("express").Router();
const { authenticate } = require("../utils/authentication");

router.post("/register", register);
router.post("/login", login);
router.get("/user", authenticate, getUser);

module.exports = router;
