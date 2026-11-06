import { useState, useContext } from "react";
import { CurrentUserContext } from "../../../../../../contexts/CurrentUserContext";
import useAsyncSubmit from "../../../../../../hooks/useAsyncSubmit";

export default function EditProfile() {
  const userContext = useContext(CurrentUserContext);
  const { currentUser, handleUpdateUser } = userContext;

  const [name, setName] = useState(currentUser.name);
  const [description, setDescription] = useState(currentUser.about);
  const { isLoading, error, submit } = useAsyncSubmit();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    submit(() => handleUpdateUser({ name, about: description }));
  };

  return (
    <form
      className="popup__form"
      name="profile-form"
      id="edit-profile-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup__label">
        <input
          className="popup__input popup__input_type_name"
          id="owner-name"
          maxLength="30"
          minLength="2"
          name="userName"
          placeholder="Nome"
          required
          type="text"
          value={name}
          onChange={handleNameChange}
        />
        <span className="popup__error" id="owner-name-error"></span>
      </label>
      <label className="popup__label">
        <input
          className="popup__input popup__input_type_description"
          id="owner-description"
          maxLength="30"
          minLength="2"
          name="userDescription"
          placeholder="Sobre mim"
          required
          type="text"
          value={description}
          onChange={handleDescriptionChange}
        />
        <span className="popup__error" id="owner-description-error"></span>
      </label>
      <span
        className={`popup__error ${error ? "popup__error_visible" : ""}`}
        role="alert"
      >
        {error}
      </span>
      <button
        className={`button popup__button ${
          isLoading ? "popup__button_inactive" : ""
        }`}
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? "Salvando..." : "Salvar"}
      </button>
    </form>
  );
}
