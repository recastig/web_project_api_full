export default function Popup(props) {
  const { onClose, title, children, isConfirmation } = props;
  return (
    <div className="popup">
      <div
        className={`popup__content ${
          !title ? "popup__content_content_image" : ""
        }${isConfirmation ? "popup__content_type_confirmation" : ""}`}
      >
        <button
          aria-label="Fechar pop-up"
          className="popup__close"
          type="button"
          onClick={onClose}
        ></button>
        {title && <h3 className="popup__title">{title}</h3>}
        {children}
      </div>
    </div>
  );
}
