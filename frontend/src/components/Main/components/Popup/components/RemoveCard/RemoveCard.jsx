export default function RemoveCard({ onConfirm }) {
  return (
    <button
      className="button popup__button"
      type="button"
      onClick={onConfirm}
    >
      Sim
    </button>
  );
}
