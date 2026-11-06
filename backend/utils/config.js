require("dotenv").config();

const isProduction = process.env.NODE_ENV === "production";

if (isProduction && !process.env.JWT_SECRET) {
  throw new Error("A variável de ambiente JWT_SECRET é obrigatória em produção");
}

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-apenas-para-desenvolvimento";

const PORT = Number(process.env.PORT) || 3000;

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/aroundb";

const DEFAULT_ORIGINS = isProduction
  ? ["https://web-project-api-full-lake.vercel.app"]
  : ["http://localhost:5173", "http://127.0.0.1:5173"];

const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
      .map((origin) => origin.trim().replace(/\/+$/, ""))
      .filter(Boolean)
  : DEFAULT_ORIGINS;

module.exports = {
  isProduction,
  JWT_SECRET,
  PORT,
  MONGODB_URI,
  ALLOWED_ORIGINS,
};
