import { useState } from "react";

export default function NewCard({ onAddPlaceSubmit }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleLinkChange(event) {
    setLink(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    onAddPlaceSubmit({ name, link });
  }

  return (
    <form
      className="popup__form"
      id="new-card-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_type_card-name"
        id="card-name-input"
        name="place-name"
        placeholder="Título"
        type="text"
        minLength="2"
        maxLength="30"
        required
        value={name}
        onChange={handleNameChange}
      />
      <span className="popup__error" id="card-name-error">
        Preencha esse campo.
      </span>
      <input
        className="popup__input popup__input_type_url"
        id="card-link-input"
        name="link"
        placeholder="Link de Imagem"
        type="url"
        required
        value={link}
        onChange={handleLinkChange}
      />
      <span className="popup__error" id="card-link-error">
        Por favor, insira um endereço web.
      </span>
      <button className="button popup__button" type="submit">
        Criar
      </button>
    </form>
  );
}
