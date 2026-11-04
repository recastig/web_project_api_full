const router = require("express").Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");

const {
  validateCreateCardBody,
  validateCardId,
} = require("../middleware/validation");

router.get("/", getCards);
router.post("/", validateCreateCardBody, createCard);
router.delete("/:cardId", validateCardId, deleteCard);
router.put("/:cardId/likes", validateCardId, likeCard);
router.delete("/:cardId/likes", validateCardId, dislikeCard);

module.exports = router;
