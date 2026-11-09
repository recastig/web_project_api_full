require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { login, createUser } = require("./controllers/users");
const auth = require("./middleware/auth");
const handleError = require("./middleware/error");
const { requestLogger, errorLogger } = require("./middleware/logger");
const {
  validateUserBody,
  validateLoginBody,
} = require("./middleware/validation");

const app = express();
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/aroundb",
);

const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");

const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.post("/signin", validateLoginBody, login);
app.post("/signup", validateUserBody, createUser);
app.use("/users", auth, usersRouter);
app.use("/cards", auth, cardsRouter);

app.use((req, res, next) => {
  next({ statusCode: 404, message: "A solicitação não foi encontrada" });
});

app.use(errorLogger);
app.use(handleError);

app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});
