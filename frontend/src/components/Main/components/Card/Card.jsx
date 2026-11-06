import { useContext } from "react";
import { CurrentUserContext } from "../../../../contexts/CurrentUserContext";

export default function Card({ card, onCardClick, onDeleteClick, onCardLike }) {
  const { currentUser } = useContext(CurrentUserContext);
  const { name, link, likes = [], owner } = card;

  // A API pode entregar owner como ID (string) ou como objeto populado.
  const ownerId =
    owner && typeof owner === "object" ? owner._id : owner;
  const currentUserId = currentUser?._id;

  // Compara os IDs como string e só exibe a lixeira quando ambos existem.
  const isOwn =
    ownerId != null &&
    currentUserId != null &&
    String(ownerId) === String(currentUserId);

  const isLiked = likes.some(
    (id) => String(id) === String(currentUserId),
  );

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
      {isOwn && (
        <button
          aria-label="Excluir cartão"
          className="card__delete-button"
          type="button"
          onClick={handleDeleteClick}
        ></button>
      )}
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
