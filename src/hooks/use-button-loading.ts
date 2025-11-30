import { useState, useCallback } from "react";

/**
 * Hook for managing button loading states during async operations
 */
export const useButtonLoading = () => {
  const [loadingButtons, setLoadingButtons] = useState<Set<string>>(new Set());

  const setLoading = useCallback((buttonId: string, isLoading: boolean) => {
    setLoadingButtons((prev) => {
      const next = new Set(prev);
      if (isLoading) {
        next.add(buttonId);
      } else {
        next.delete(buttonId);
      }
      return next;
    });
  }, []);

  const withLoading = useCallback(
    async <T,>(buttonId: string, asyncFn: () => Promise<T>): Promise<T | null> => {
      setLoading(buttonId, true);
      try {
        const result = await asyncFn();
        return result;
      } catch (error) {
        console.error(`Error in button action ${buttonId}:`, error);
        return null;
      } finally {
        // Small delay to show loading state
        setTimeout(() => setLoading(buttonId, false), 300);
      }
    },
    [setLoading]
  );

  const isLoading = useCallback(
    (buttonId: string) => loadingButtons.has(buttonId),
    [loadingButtons]
  );

  return {
    isLoading,
    setLoading,
    withLoading,
  };
};

