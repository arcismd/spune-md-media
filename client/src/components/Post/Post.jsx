import React from 'react';

import { UserInfo } from '../UserInfo/UserInfo';

export const Post = ({
  _id,
  title,
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
        return '';
  }

  const onClickRemove = () => {};

  return (
    <div className='post-bg'>
      <div className='user-info'>
        <UserInfo {...user} additionalText={createdAt} />
        {isEditable && (
        <div className='edit-delete'>
          <a href={`/posts/${_id}/edit`}>
            <span>EDIT</span>
          </a>
          <span onClick={onClickRemove}>DELETE</span>
        </div>
      )}
      </div>




                <h2 className=''>
            {isFullPost ? title : <a href={`/posts/${_id}`}>{title}</a>}
          </h2>
      {imageUrl && (
        <img
          className='post-img'
          src={imageUrl}
          alt={title}
        />
      )}
      <div className=''>
        <div className=''>
          <ul className=''>
            {tags.map((name) => (
              <li key={name}>
                <a href={`/tag/${name}`}>#{name}</a>
              </li>
            ))}
          </ul>
          {children && <div className=''>{children}</div>}
          <ul className=''>
            <li>
              VIEWS
              <span>{viewsCount}</span>
            </li>
            <li>
              COMMENTS
              <span>{commentsCount}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};