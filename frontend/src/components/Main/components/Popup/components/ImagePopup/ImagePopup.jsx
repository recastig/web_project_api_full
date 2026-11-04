export default function ImagePopup({ link = "#", name = "" }) {
  return (
    <>
      <img src={link} alt={name} className="popup__image" />
      <p className="popup__caption">{name}</p>
    </>
  );
}
