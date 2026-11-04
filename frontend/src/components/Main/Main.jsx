import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import EditProfile from "./components/Popup/components/EditProfile/EditProfile";
import NewCard from "./components/Popup/components/NewCard/NewCard";
import EditAvatar from "./components/Popup/components/EditAvatar/EditAvatar";
import RemoveCard from "./components/Popup/components/RemoveCard/RemoveCard";
import ImagePopup from "./components/Popup/components/ImagePopup/ImagePopup";
import Popup from "./components/Popup/Popup";
import Card from "./components/Card/Card";

export default function Main({
  cards,
  onCardLike,
  onCardDelete,
  onAddPlaceSubmit,
  onOpenPopup,
  onClosePopup,
  popup,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  const newCardPopup = {
    title: "Novo local",
    children: <NewCard onAddPlaceSubmit={onAddPlaceSubmit} />,
  };
  const editAvatarPopup = {
    title: "Alterar foto de perfil",
    children: <EditAvatar />,
  };
  const editProfilePopup = {
    title: "Editar perfil",
    children: <EditProfile />,
  };

  function handleCardClick(card) {
    onOpenPopup({
      title: "",
      children: <ImagePopup name={card.name} link={card.link} />,
    });
  }

  function handleDeleteClick(card) {
    onOpenPopup({
      title: "Tem certeza?",
      isConfirmation: true,
      children: <RemoveCard onConfirm={() => onCardDelete(card)} />,
    });
  }

  return (
    <main className="content">
      <section className="profile page__section">
        <div className="profile__avatar-wrapper">
          <img
            className="profile__image"
            src={currentUser?.avatar}
            alt="Avatar"
          />
          <button
            aria-label="Editar foto do perfil"
            className="profile__avatar-edit-button"
            type="button"
            onClick={() => onOpenPopup(editAvatarPopup)}
          ></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser?.name}</h1>
          <button
            aria-label="Editar perfil"
            className="profile__edit-button"
            type="button"
            onClick={() => onOpenPopup(editProfilePopup)}
          ></button>
          <p className="profile__description">{currentUser?.about}</p>
        </div>
        <button
          aria-label="Adicionar cartão"
          className="profile__add-button"
          type="button"
          onClick={() => onOpenPopup(newCardPopup)}
        ></button>
      </section>
      <section className="cards page__section">
        <ul className="cards__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={handleCardClick}
              onDeleteClick={handleDeleteClick}
              onCardLike={onCardLike}
            />
          ))}
        </ul>
      </section>
      {popup && <Popup {...popup} onClose={onClosePopup} />}
    </main>
  );
}
