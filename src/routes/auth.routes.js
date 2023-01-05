const router = require("express").Router();
const { registerUser, getAllUsers } = require("../controllers/auth.controller");
const { userValidator } = require("../middlewares/validators/user.validator");

router.get("/", getAllUsers);
router.put("/register", [userValidator, registerUser]);

module.exports = router;
