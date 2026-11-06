import { useContext, useRef } from "react";
import { CurrentUserContext } from "../../../../../../contexts/CurrentUserContext";
import useAsyncSubmit from "../../../../../../hooks/useAsyncSubmit";

export default function EditAvatar() {
  const { handleUpdateAvatar } = useContext(CurrentUserContext);
  const avatarInputRef = useRef();
  const { isLoading, error, submit } = useAsyncSubmit();

  function handleSubmit(event) {
    event.preventDefault();

    submit(() => handleUpdateAvatar({ avatar: avatarInputRef.current.value }));
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
      <span
        className={`popup__error ${error ? "popup__error_visible" : ""}`}
        id="avatar-link-error"
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
