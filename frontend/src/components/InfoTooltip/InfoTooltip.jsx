export default function InfoTooltip({ isOpen, onClose, isSuccess }) {
  if (!isOpen) return null;

  function handleOverlayClick(evt) {
    if (evt.target === evt.currentTarget) onClose();
  }

  return (
    <div className="popup popup_is-opened" onMouseDown={handleOverlayClick}>
      <div className="popup__content popup__content_type_tooltip">
        <button
          aria-label="Fechar pop-up"
          className="popup__close"
          type="button"
          onClick={onClose}
        ></button>
        <div className="popup__tooltip-icon">
          {isSuccess ? (
            <div className="popup__tooltip-icon_success">✓</div>
          ) : (
            <div className="popup__tooltip-icon_error">✕</div>
          )}
        </div>
        <p className="popup__tooltip-text">
          {isSuccess
            ? "Sucesso! Faça seu login."
            : "Ops, algo deu errado! Por favor, tente novamente."}
        </p>
      </div>
    </div>
  );
}