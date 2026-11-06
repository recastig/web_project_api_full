import useAsyncSubmit from "../../../../../../hooks/useAsyncSubmit";

export default function RemoveCard({ onConfirm }) {
  const { isLoading, error, submit } = useAsyncSubmit();

  return (
    <>
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
        type="button"
        disabled={isLoading}
        onClick={() => submit(onConfirm)}
      >
        {isLoading ? "Excluindo..." : "Sim"}
      </button>
    </>
  );
}
