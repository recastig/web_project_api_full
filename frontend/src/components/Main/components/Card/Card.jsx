import { useContext } from "react";
import { CurrentUserContext } from "../../../../contexts/CurrentUserContext";

export default function Card({ card, onCardClick, onDeleteClick, onCardLike }) {
  const { currentUser } = useContext(CurrentUserContext);
  const { name, link, likes } = card;
  const isLiked = likes.some((id) => id === currentUser._id);

  const cardLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_is-active" : ""
  }`;

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onDeleteClick(card);
  }

  return (
    <li className="card">
      <img
        className="card__image"
        src={link}
        alt={name}
        onClick={() => onCardClick(card)}
      />
      <button
        aria-label="Excluir cartão"
        className="card__delete-button"
        type="button"
        onClick={handleDeleteClick}
      ></button>
      <div className="card__description">
        <h2 className="card__title">{name}</h2>
        <button
          aria-label="Botão de curtir"
          className={cardLikeButtonClassName}
          type="button"
          onClick={handleLikeClick}
        ></button>
      </div>
    </li>
  );
}
