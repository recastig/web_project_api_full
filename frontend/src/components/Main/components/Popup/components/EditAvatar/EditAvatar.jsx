import { useContext, useRef } from "react";
import { CurrentUserContext } from "../../../../../../contexts/CurrentUserContext";

export default function EditAvatar() {
  const { handleUpdateAvatar } = useContext(CurrentUserContext);
  const avatarInputRef = useRef();

  function handleSubmit(event) {
    event.preventDefault();

    handleUpdateAvatar({ avatar: avatarInputRef.current.value });
  }

  return (
    <form
      className="popup__form"
      id="edit-avatar-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <input
        ref={avatarInputRef}
        className="popup__input popup__input_type_avatar"
        id="avatar-link-input"
        name="avatar"
        placeholder="Link da nova foto"
        type="url"
        required
      />
      <span className="popup__error" id="avatar-link-error">
        Por favor, insira um endereço web.
      </span>
      <button className="button popup__button" type="submit">
        Salvar
      </button>
    </form>
  );
}
