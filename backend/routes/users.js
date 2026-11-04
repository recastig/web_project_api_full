const router = require("express").Router();
const {
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
  getCurrentUser,
} = require("../controllers/users");

const {
  validateUpdateUserBody,
  validateUpdateAvatarBody,
  validateUserId,
} = require("../middleware/validation");

router.get("/", getUsers);
router.get("/me", getCurrentUser);
router.get("/:userId", validateUserId, getUserById);
router.patch("/me", validateUpdateUserBody, updateUser);
router.patch("/me/avatar", validateUpdateAvatarBody, updateAvatar);

module.exports = router;
