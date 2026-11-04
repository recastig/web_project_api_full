import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import logo from "../../images/logo.svg";
import AppContext from "../../contexts/AppContext";

export default function Header({ email, onSignOut }) {
  const { isLoggedIn } = useContext(AppContext);
  const { pathname } = useLocation();

  return (
    <header className="header page__section">
      <img
        alt="Logotipo Around The U.S."
        className="logo header__logo"
        src={logo}
      />
      {isLoggedIn ? (
        <div className="header__auth">
          <p className="header__email">{email}</p>
          <button className="header__signout" type="button" onClick={onSignOut}>
            Sair
          </button>
        </div>
      ) : pathname === "/signup" ? (
        <Link className="header__link" to="/signin">
          Faça o login
        </Link>
      ) : (
        <Link className="header__link" to="/signup">
          Inscreva-se
        </Link>
      )}
    </header>
  );
}
