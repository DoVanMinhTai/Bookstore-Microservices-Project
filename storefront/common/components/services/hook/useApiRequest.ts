import { useCallback, useEffect, useState } from 'react';

export interface UseApiRequestState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

export interface UseApiRequestResult<T> extends UseApiRequestState<T> {
  refetch: () => Promise<void>;
}

export type ApiRequestFn<T> = () => Promise<T>;

export function useApiRequest<T>(
  requestFn: ApiRequestFn<T>,
  options?: {
    immediate?: boolean;
  }
): UseApiRequestResult<T> {
  const { immediate = true } = options || {};

  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await requestFn();
      setData(result);
    } catch (err: unknown) {
      let message = 'Đã xảy ra lỗi khi gọi API.';

      if (err instanceof Error && err.message) {
        message = err.message;
      }

      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [requestFn]);

  useEffect(() => {
    if (immediate) {
      void execute();
    }
  }, [execute, immediate]);

  return {
    data,
    isLoading,
    error,
    refetch: execute,
  };
}