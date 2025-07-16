// hooks/useApi.ts
import { useEffect, useRef, useState } from 'react';
import { generateJWTToken } from '../utils/generateJWTToken';

interface UseApiOptions {
  method?: 'GET' | 'POST';
  queryParams?: Record<string, string>;
  body?: any;
}

export const useApi = (
  baseUrl: string,
  options: UseApiOptions = {}
) => {
  const {
    method = 'GET',
    queryParams = {},
    body = null,
  } = options;

  const [apiloading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const tokenRef = useRef<string>(generateJWTToken());

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Prepare full URL with query parameters
        const queryString = new URLSearchParams(queryParams).toString();
        const fullUrl = `${baseUrl}?${queryString}`;

        const response = await fetch(fullUrl, {
          method,
          headers: {
            Authorization: `Bearer ${tokenRef.current}`,
            'Content-Type': 'application/json',
          },
          body: method === 'POST' && body ? JSON.stringify(body) : null,
        });

        const json = await response.json();
        setData(json);
      } catch (err: any) {
        setError(err.message || 'API Error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [baseUrl, JSON.stringify(queryParams), JSON.stringify(body), method]);

  return { apiloading, data, error };
};
