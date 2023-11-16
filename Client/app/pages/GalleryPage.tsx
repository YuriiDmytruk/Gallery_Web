'use client';
import React, { useEffect } from 'react';

import ImageCard from '@/app/components/ImageCard';
import AddButton from '@/app/components/AddButton';

import { ImageType, UserState } from '@/app/types';
import { useDispatch, useSelector } from 'react-redux';
import { setImages } from '../redux/ducks/user';

interface GalleryPageProps {
  userId: string;
  images: ImageType[];
}

const GalleryPage = (props: GalleryPageProps) => {
  const dispatch = useDispatch();

  const userId = useSelector((state: UserState) => state._id);

  const nickName = useSelector((state: UserState) => state.nickName);
  let images = useSelector((state: UserState) => state.images);

  useEffect(() => {
    if (images.length === 0) {
      dispatch(setImages(props.images));
    }
  }, [dispatch, images.length, props.images]);

  if (props.userId === 'popular' || props.userId !== userId.toString()) {
    images = props.images;
  }

  return (
    <div className="h-full w-full pt-[7%] px-5">
      <div>
        <div className="flex flex-wrap justify-around">
          {images.map((image) => (
            <ImageCard key={image._id} image={image} page={props.userId} />
          ))}
        </div>
        {props.userId !== 'popular' ? (
          <AddButton userId={userId} userNickName={nickName} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default GalleryPage;
