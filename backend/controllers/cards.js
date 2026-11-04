const Card = require("../models/card");

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next({ statusCode: 400, message: err.message });
      }
      return next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .orFail()
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        return next({
          statusCode: 403,
          message: "Você não tem permissão para deletar este cartão",
        });
      }
      return Card.findByIdAndDelete(cardId).then(() => res.send(card));
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return next({ statusCode: 404, message: "Cartão não encontrado" });
      }
      if (err.name === "CastError") {
        return next({ statusCode: 400, message: "ID inválido" });
      }
      return next(err);
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return next({ statusCode: 404, message: "Cartão não encontrado" });
      }
      if (err.name === "CastError") {
        return next({ statusCode: 400, message: "ID inválido" });
      }
      return next(err);
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return next({ statusCode: 404, message: "Cartão não encontrado" });
      }
      if (err.name === "CastError") {
        return next({ statusCode: 400, message: "ID inválido" });
      }
      return next(err);
    });
};
