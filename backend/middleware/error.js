const { isCelebrateError } = require("celebrate");

const handleError = (err, req, res, next) => {
  if (isCelebrateError(err)) {
    let message = "Dados inválidos";
    const first = err.details.values().next().value;
    if (first && first.details && first.details[0]) {
      message = first.details[0].message;
    }
    return res.status(400).send({ message });
  }

  if (err.name === "ValidationError") {
    return res.status(400).send({ message: err.message });
  }
  if (err.name === "CastError") {
    return res.status(400).send({ message: "ID inválido" });
  }
  if (err.name === "DocumentNotFoundError") {
    return res.status(404).send({ message: "Recurso não encontrado" });
  }
  if (err.code === 11000) {
    return res.status(409).send({ message: "Este e-mail já está cadastrado" });
  }

  const { statusCode = 500, message } = err;
  return res.status(statusCode).send({
    message: statusCode === 500 ? "Ocorreu um erro no servidor" : message,
  });
};

module.exports = handleError;
