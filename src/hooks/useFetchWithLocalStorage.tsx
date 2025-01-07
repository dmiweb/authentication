import { useState, useEffect } from "react";
// import {TUser} from '../models/index';
import { TNews } from '../models/index';

type FetchResult = {
  data?: TNews[] | null,
  loading: boolean,
  error: string | null,
};

export const useFetchWithLocalStorage = (
  url: string,
  opts = {},
  localeStorageKey: string | null = null,
  trigger: number = 0
): [FetchResult] => {
  const [data, setData] = useState<TNews[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await fetch(url, opts);

        if (!response.ok) {
          switch (response.status) {
            case 400:
              setError(response.status + ' - ' + 'Неправильный логин или пароль');
              break;
            case 401:
              setError(response.status + ' - ' + 'Сессия закрыта, обновите страницу');
              localStorage.removeItem('site_access_token');
              localStorage.removeItem('site_user_profile');
              break;
            case 404:
              setError(response.status + ' - ' + 'Ошибка сети');
              break;
            case 500:
              setError(response.status + ' - ' + 'Ошибка ответа сервера');
              break;
            default:
              setError('Неизвестная ошибка');
          }
        }

        const resData = await response.json();

        if (resData && localeStorageKey) {
          localStorage.setItem(localeStorageKey, JSON.stringify(resData));
        } else {
          setData(resData);
        }
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false);
      }
    };

    if (!url) return;

    fetchData();

    return () => setError(null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, trigger]);

  return [{ data, loading, error }];
};