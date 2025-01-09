import { useFetchWithLocalStorage } from '../../hooks/useFetchWithLocalStorage';
import { useGetToken } from '../../hooks/useGetToken';
import News from './News';
import './NewsFeed.css'

const NewsFeed = (): JSX.Element => {

  const token = useGetToken();

  const [{ data: news, loading, error }] = useFetchWithLocalStorage(
    token ? import.meta.env.VITE_NEWS_URL : null,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

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