import { useState, useEffect } from "react";

export const useGetToken = (trigger = false): string | null => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedValue: string | null = localStorage.getItem('site_access_token');
    if (storedValue && 'token' in JSON.parse(storedValue)) {
      const {token} = storedValue && JSON.parse(storedValue);

      setToken(token);
    }
  }, [trigger]);

  return token;
};