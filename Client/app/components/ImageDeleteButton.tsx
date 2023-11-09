'use client';
import React from 'react';
import { Trash3 } from 'react-bootstrap-icons';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

import { deleteImage } from '../util/api';
import { UserType } from '../types';

interface ImageDeleteButtonProps {
  imageId: string;
}

const ImageDeleteButton = (props: ImageDeleteButtonProps) => {
  const userId = useSelector((state: UserType) => state._id);
  const router = useRouter();

  const onDeleteClick = async () => {
    await deleteImage(props.imageId);
    router.push(`/gallery/${userId}`);
  };

  return (
    <button onClick={onDeleteClick} className="btn btn-ghost rounded-full">
      <Trash3 />
    </button>
  );
};

export default ImageDeleteButton;
