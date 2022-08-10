import React from 'react';
import ReactTimeAgo from 'react-time-ago'

export const UserInfo = ({ avatarUrl, userName, additionalText }) => {
  return (
    <div className='user-info-module'>
      <img className='user-post-avatar' src={avatarUrl || 'https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg'} alt={userName} />
      <span className='username'>{userName}</span>
        <span className='created-date'><ReactTimeAgo date={additionalText} /></span>
    </div>
  );
};