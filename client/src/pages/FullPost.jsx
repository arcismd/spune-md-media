import axios from '../axios'
import React from "react";
import { Post } from '../components/Post/Post'
import { useParams } from 'react-router-dom';

export const FullPost = () => {

  const [data, setData] = React.useState();
  const [isLoading, setLoading] = React.useState(true);
  const {id} = useParams();
  React.useEffect(() => {
    axios.get(`/posts/${id}`).then(res => {
        setData(res.data);
        setLoading(false);
    }).catch((err) => {
        console.warn(err);
    });
}, []);

  if (isLoading) {
      return <Post isLoading={isLoading} isFullPost/>;
  }

  return (
    <>
          <Post
              id={data._id}
              title={data.title}
              text={data.text.substring(0, 0)}
              imageUrl={data.imageUrl}
              user={data.user}
              createdAt={data.createdAt}
              viewsCount={data.viewsCount}
              commentsCount={data.commentsCount}
              tags={data.tags}
              isFullPost>
                <p>{data.text}</p>
              </Post>
    </>
  )
}

