import React from 'react'
import { date, month } from '../components/Date'
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, fetchTags } from '../redux/slices/posts';
import { Post } from '../components/Post/Post';

export const MainPage = () => {

  const dispatch = useDispatch();
  const { posts, tags } = useSelector(state => state.posts);

  const isPostsLoading = posts.status === 'loading';

  React.useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, []);

  return (
    <>
    <div className='main-page-grid'>
      <h4><div className='flex-date-main-page'><span className='news-dot'>&#10256;</span>{date} {month}</div></h4>
      <div className='main-page-news'>
      </div>
      <div className='kek1'></div>
      <div className='kek'>
        <h3>Comunitati</h3>
        <h3>Taguri</h3>
      </div>
    </div>
    <div>
      
    {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) => 
    isPostsLoading ? (
    <Post key={index} isLoading={true}/> 
    ) : (
            <Post
              id={obj._id}
              title={obj.title}
              imageUrl="https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png"
              user={obj.user}
              createdAt={obj.createdAt}
              viewsCount={obj.viewsCount}
              commentsCount={obj.commentsCount}
              tags={obj.tags}
              isEditable
            />
          ))}
      
    </div>
    </>
  )
}
