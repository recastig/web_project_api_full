const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: "O e-mail fornecido não é válido",
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Seu nome",
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Arounder",
  },
  avatar: {
    type: String,
    default: "https://cdn-icons-png.flaticon.com/512/6596/6596121.png",
    validate: {
      validator(v) {
        return /^(https?:\/\/)(www\.)?[\w\-._~:/?#[\]@!$&'()*+,;=]+#?$/.test(v);
      },
      message: "O link do avatar não é válido",
    },
  },
});

module.exports = mongoose.model("user", userSchema);
