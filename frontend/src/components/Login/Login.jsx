import { Link } from "react-router-dom";
import { useState } from "react";
import useAsyncSubmit from "../../hooks/useAsyncSubmit";

export default function Login({ handleLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading, submit } = useAsyncSubmit();

  function handleSubmit(e) {
    e.preventDefault();
    submit(() => handleLogin({ email, password }));
  }

  return (
    <div className="auth">
      <h2 className="auth__title">Entrar</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          className="auth__input"
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="auth__input"
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="auth__button" type="submit" disabled={isLoading}>
          {isLoading ? "Entrando..." : "Entrar"}
        </button>
      </form>
      <p className="auth__link">
        Ainda não é membro? <Link to="/signup">Inscreva-se aqui!</Link>
      </p>
    </div>
  );
}
