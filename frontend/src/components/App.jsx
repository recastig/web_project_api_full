import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import Login from "./Login/Login";
import Register from "./Register/Register";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import InfoTooltip from "./InfoTooltip/InfoTooltip";
import api from "../utils/api";
import * as auth from "../utils/auth";
import { getErrorMessage } from "../utils/http";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import AppContext from "../contexts/AppContext";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [popup, setPopup] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [tooltipMessage, setTooltipMessage] = useState("");
  const [isCheckingToken, setIsCheckingToken] = useState(() =>
    Boolean(localStorage.getItem("jwt")),
  );

  const navigate = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");

    if (!jwt) {
      return;
    }

    api.setToken(jwt);

    auth
      .checkToken(jwt)
      .then((data) => {
        setUserEmail(data.email);
        setIsLoggedIn(true);
      })
      .catch((error) => {
        console.error(error);
        localStorage.removeItem("jwt");
      })
      .finally(() => setIsCheckingToken(false));
  }, []);

  useEffect(() => {
    if (!isLoggedIn) return;

    api
      .getUserInfo()
      .then((user) => {
        setCurrentUser((prev) => ({ ...prev, ...user }));
      })
      .catch((error) => console.error(error));

    api
      .getInitialCards()
      .then((cardsData) => {
        setCards(Array.isArray(cardsData) ? cardsData : []);
      })
      .catch((error) => console.error(error));
  }, [isLoggedIn]);

  function showError(error) {
    setIsSuccess(false);
    setTooltipMessage(getErrorMessage(error));
    setIsInfoTooltipOpen(true);
  }

  function handleRegistration({ email, password }) {
    return auth
      .register(email, password)
      .then(() => {
        setIsSuccess(true);
        setTooltipMessage("");
        setIsInfoTooltipOpen(true);
        navigate("/signin");
      })
      .catch(showError);
  }

  function handleLogin({ email, password }) {
    return auth
      .authorize(email, password)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        api.setToken(data.token);

        setUserEmail(email);
        setIsLoggedIn(true);
        navigate("/");
      })
      .catch(showError);
  }

  function handleSignOut() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setUserEmail("");
    setCurrentUser({});
    navigate("/signin");
  }

  function handleOpenPopup(popupConfig) {
    setPopup(popupConfig);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  function handleUpdateUser(data) {
    return api.updateUserInfo(data).then((newData) => {
      setCurrentUser(newData);
      handleClosePopup();
    });
  }

  function handleUpdateAvatar(data) {
    return api.updateAvatar(data.avatar).then((newData) => {
      setCurrentUser(newData);
      handleClosePopup();
    });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((id) => id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((updatedCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? updatedCard : currentCard,
          ),
        );
      })
      .catch(showError);
  }

  function handleCardDelete(card) {
    return api.deleteCard(card._id).then(() => {
      setCards((state) =>
        state.filter((currentCard) => currentCard._id !== card._id),
      );
      handleClosePopup();
    });
  }

  function handleAddPlaceSubmit(data) {
    return api.addCard(data).then((newCard) => {
      setCards((state) => [newCard, ...state]);
      handleClosePopup();
    });
  }

  return (
    <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <CurrentUserContext.Provider
        value={{ currentUser, handleUpdateUser, handleUpdateAvatar }}
      >
        <div className="page__content">
          <Header onSignOut={handleSignOut} email={userEmail} />

          {isCheckingToken ? null : (
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Main
                      cards={cards}
                      onCardLike={handleCardLike}
                      onCardDelete={handleCardDelete}
                      onAddPlaceSubmit={handleAddPlaceSubmit}
                      onOpenPopup={handleOpenPopup}
                      onClosePopup={handleClosePopup}
                      popup={popup}
                    />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/signup"
                element={
                  <ProtectedRoute anonymous>
                    <Register handleRegistration={handleRegistration} />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/signin"
                element={
                  <ProtectedRoute anonymous>
                    <Login handleLogin={handleLogin} />
                  </ProtectedRoute>
                }
              />

              <Route
                path="*"
                element={
                  isLoggedIn ? (
                    <Navigate to="/" replace />
                  ) : (
                    <Navigate to="/signin" replace />
                  )
                }
              />
            </Routes>
          )}

          <Footer />

          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onClose={() => setIsInfoTooltipOpen(false)}
            isSuccess={isSuccess}
            message={tooltipMessage}
          />
        </div>
      </CurrentUserContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
