import { Link } from "react-router-dom";
import { useState } from "react";
import useAsyncSubmit from "../../hooks/useAsyncSubmit";

export default function Register({ handleRegistration }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading, submit } = useAsyncSubmit();

  function handleSubmit(e) {
    e.preventDefault();
    submit(() => handleRegistration({ email, password }));
  }

  return (
    <div className="auth">
      <h2 className="auth__title">Inscrever-se</h2>
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
          {isLoading ? "Inscrevendo..." : "Inscrever-se"}
        </button>
      </form>
      <p className="auth__link">
        Já é um membro? <Link to="/signin">Faça o login aqui!</Link>
      </p>
    </div>
  );
}
