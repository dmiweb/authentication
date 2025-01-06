import './NewsFeed.css';

type NewsProps = {
  news: {
    id: string,
    title: string,
    image: string,
    content: string
  }
}

const News = (props: NewsProps): JSX.Element => {
  const { id, title, image, content } = props.news;

  return (
    <li id={id} className='news'>
      <h2 className='news-title'>{title}</h2>
      <div className='news-image-wrap'>
        <img src={image} className='news-image' alt={title} />
      </div>
      <p className='news-content'>{content}</p>
    </li>
  );
};

export default News;