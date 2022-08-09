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
    <div className=''>
      {isEditable && (
        <div className=''>
          <a href={`/posts/${_id}/edit`}>
            <span>EDIT</span>
          </a>
          <span onClick={onClickRemove}>DELETE</span>
        </div>
      )}
      {imageUrl && (
        <img
          className=''
          src={imageUrl}
          alt={title}
        />
      )}
      <div className=''>
        <UserInfo {...user} additionalText={createdAt} />
        <div className=''>
          <h2 className=''>
            {isFullPost ? title : <a href={`/posts/${_id}`}>{title}</a>}
          </h2>
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