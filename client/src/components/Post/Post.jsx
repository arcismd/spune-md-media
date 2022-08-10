import React from 'react';
import postViewsImg from '../../images/posts/views.png';
import MainPagePostLoader from './Skeleton';

import { UserInfo } from '../UserInfo/UserInfo';
export const Post = ({
  _id,
  title,
  text,
  createdAt,
  imageUrl,
  user,
  viewsCount,
  commentsCount,
  tags,
  children,
  isFullPost,
  isLoading,
  isEditable,
}) => {

    if (isLoading) {
      return  <div style={{ width: "100%"}}>
      <MainPagePostLoader viewBox="0 0 350 240"/>
    </div>;
  }

  let viewsText = 'vizualizări'

  if (viewsCount === 1) {
    viewsText = 'vizualizare'
  }

  let textDots = ''

    if (text.length > 250) {
      textDots = '...'
    }

  const onClickRemove = () => {};

  return (
    <div className='post-bg'>
      <div className='user-info'>
        <UserInfo {...user} additionalText={createdAt} />
        {isEditable && (
        <div className='edit-delete'>
          <a href={`/posts/${_id}/edit`}>
            <span>e</span>
          </a>
          <span onClick={onClickRemove}>d</span>
        </div>
      )}
          <div className='views-counter'>
          <img src={postViewsImg} width={16} height={16} /><span>{viewsCount} {viewsText }</span>
          </div>
      </div>
          <h2>
            {isFullPost ? title : <a href={`/posts/${_id}`}>{title.substring(0, 150)}</a>}
          </h2>
          <h3>
            {text.substring(0, 250)}{textDots}
          </h3>
      {imageUrl && (
        <img
          className='post-img'
          src={imageUrl}
          alt={title}
        />
      )}
          <ul className='tags'>
            {tags.map((name) => (
              <li key={name}>
                <a href={`/tag/${name}`}>#{name}</a>
              </li>
            ))}
          </ul>
          {children && <div className=''>{children}</div>}
          <ul className='comments-like'>
            <li>
              COMMENTS
              <span>{commentsCount}</span>
            </li>
          </ul>
    </div>
  );
};