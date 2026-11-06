const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return next({ statusCode: 404, message: "Usuário não encontrado" });
      }
      if (err.name === "CastError") {
        return next({ statusCode: 400, message: "ID inválido" });
      }
      return next(err);
    });
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return next({ statusCode: 404, message: "Usuário não encontrado" });
      }
      if (err.name === "CastError") {
        return next({ statusCode: 400, message: "ID inválido" });
      }
      return next(err);
    });
};

module.exports.createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => {
      return User.create({ email, password: hash, name, about, avatar });
    })
    .then((user) => {
      res.status(201).send({
        email: user.email,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        _id: user._id,
      });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next({ statusCode: 400, message: err.message });
      }
      if (err.code === 11000) {
        return next({
          statusCode: 409,
          message: "Este e-mail já está cadastrado",
        });
      }
      return next(err);
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next({ statusCode: 400, message: err.message });
      }
      if (err.name === "DocumentNotFoundError") {
        return next({ statusCode: 404, message: "Usuário não encontrado" });
      }
      return next(err);
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next({ statusCode: 400, message: err.message });
      }
      if (err.name === "DocumentNotFoundError") {
        return next({ statusCode: 404, message: "Usuário não encontrado" });
      }
      return next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return next({ statusCode: 401, message: "E-mail ou senha incorretos" });
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return next({
            statusCode: 401,
            message: "E-mail ou senha incorretos",
          });
        }
        const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
          expiresIn: "7d",
        });
        return res.send({ token });
      });
    })
    .catch(next);
};
