import { useState } from "react";

export default function useAsyncSubmit() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(action) {
    if (isLoading) return;
    setIsLoading(true);
    setError("");
    try {
      return await action();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Não foi possível concluir a operação.");
      return undefined;
    } finally {
      setIsLoading(false);
    }
  }

  return { isLoading, error, submit };
}
