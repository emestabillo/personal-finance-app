// hooks/useAuthenticatedFetch.ts
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

type FetchFunction<T> = (token: string) => Promise<T>;

export function useAuthenticatedFetch<T>(
  fetcher: FetchFunction<T>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deps: any[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fetchLoading, setFetchLoading] = useState(true);
  const { token, isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (!isAuthenticated || !token) {
        setError("Please log in to access this data");
        setFetchLoading(false);
        return;
      }

      try {
        setFetchLoading(true);
        const result = await fetcher(token);
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setFetchLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated, token, ...deps]);

  return { data, error, loading: fetchLoading };
}
