import React from 'react'
import { date, month } from '../components/Date'
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, fetchTags } from '../redux/slices/posts';
import { Post } from '../components/Post/Post';

export const MainPage = () => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.data);
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
    <div className='main-page-grid'>
    <div className='post'>
    {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) => 
    isPostsLoading ? (
    <Post key={index} isLoading={true}/>
    ) : (
            <Post
              id={obj._id}
              title={obj.title}
              text={obj.text}
              mainText={obj.mainText}
              imageUrl={obj.imageUrl}
              user={obj.user}
              createdAt={obj.createdAt}
              viewsCount={obj.viewsCount}
              commentsCount={obj.commentsCount}
              tags={obj.tags}
              isEditable={userData?._id === obj.user._id}
            />
          ))}
           </div>
    </div>
    </>
  )
}
