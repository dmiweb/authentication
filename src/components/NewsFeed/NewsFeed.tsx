import { useFetchWithLocalStorage } from '../../hooks/useFetchWithLocalStorage';
import News from './News';
import './NewsFeed.css'

const NewsFeed = (): JSX.Element => {
  const saveToken = localStorage.getItem('site_access_token');
  const { token } = saveToken && JSON.parse(saveToken);

  const [{ data: news, loading, error }] = useFetchWithLocalStorage(import.meta.env.VITE_NEWS_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });

  return (
    <section className='news-feed-page'>
      {loading && <div className='loading'>Loading...</div>}
      {error && <div className='error-message'>{error}</div>}
      {!loading && news &&
        <ul className='news-feed'>
          {news.map(item => <News key={item.id} news={item} />)}
        </ul>}
    </section>
  );
};

export default NewsFeed;