// utils/callApi.ts
import { generateJWTToken } from './generateJWTToken';

export const callApi = async (
  url: string,
  method: 'GET' | 'POST',
  queryParams: Record<string, string>
): Promise<any> => {
  const token = generateJWTToken();
  const queryString = new URLSearchParams(queryParams).toString();
  const fullUrl = `${url}?${queryString}`;

  try {
    const response = await fetch(fullUrl, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'Something went wrong');
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error.message || 'API Error');
  }
};
