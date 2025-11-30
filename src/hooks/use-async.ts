import { useState, useCallback } from "react";

interface UseAsyncOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

/**
 * Hook for managing async operations with loading and error states
 */
export const useAsync = <T,>(options?: UseAsyncOptions) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(
    async (asyncFunction: () => Promise<T>): Promise<T | null> => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await asyncFunction();
        if (options?.onSuccess) {
          options.onSuccess();
        }
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);
        if (options?.onError) {
          options.onError(error);
        }
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [options]
  );

  const reset = useCallback(() => {
    setError(null);
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    error,
    execute,
    reset,
  };
};

