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
      return <Post isLoading={isLoading} />;
  }

  return (
    <>
          <Post
              id={data._id}
              title={data.title}
              text={data.text}
              imageUrl="https://i.simpalsmedia.com/point.md/news/809x456/e99dc6b03cddada6b16344fc3a458186.jpg"
              user={data.user}
              createdAt={data.createdAt}
              viewsCount={data.viewsCount}
              commentsCount={data.commentsCount}
              tags={data.tags}
              isEditable
            />
    </>
  )
}

