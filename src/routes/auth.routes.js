const router = require("express").Router();
const {
  registerUser,
  getAllUsers,
  authenticate,
} = require("../controllers/auth.controller");
const { userValidator } = require("../middlewares/validators/user.validator");

router.get("/", getAllUsers);
router.put("/register", [userValidator, registerUser]);
router.post("/login", authenticate);
module.exports = router;
