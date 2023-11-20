'use client';
import React from 'react';
import { Trash3 } from 'react-bootstrap-icons';

import { useDispatch } from 'react-redux';
import { deleteImage as deleteImageFromState } from '@/app/redux/ducks/user';

import { deleteImage } from '@/app/util/api';

interface ImageDeleteButtonProps {
  imageId: string;
}

const ImageDeleteButton = (props: ImageDeleteButtonProps) => {
  const dispatch = useDispatch();

  const onDeleteClick = async () => {
    const result = await deleteImage(props.imageId);
    console.log(result.statusCode)
    if (result.statusCode === 200) {
      dispatch(deleteImageFromState(props.imageId));
    }
  };

  return (
    <button onClick={onDeleteClick} className="btn btn-ghost rounded-full">
      <Trash3 />
    </button>
  );
};

export default ImageDeleteButton;
