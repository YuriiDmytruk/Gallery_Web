'use client';
import React from 'react';

const FriendDeleteButton = () => {
  const onDeleteClick = () => {
    console.log('Delete friend');
  };

  return (
    <button className="btn btn-error" onClick={onDeleteClick}>
      Delete friend
    </button>
  );
};

export default FriendDeleteButton;
