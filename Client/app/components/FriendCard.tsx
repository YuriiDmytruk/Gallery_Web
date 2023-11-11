'use client';
import React, { useState, useEffect } from 'react';

import ImageCarousel from '@/app/components/ImageCarousel';
import FriendDeleteButton from '@/app/components/FriendDeleteButton';

import { ImageType, UserType } from '@/app/types';
import { getImages } from '@/app/util/api';

interface FriendCardProps {
  friend: UserType;
}

const FriendCard = (props: FriendCardProps) => {
  const [images, setImages] = useState<ImageType[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      const images = (await getImages(props.friend._id, '')).value as ImageType[];
      setImages(images as ImageType[]);
    };

    fetchImages();
  }, [props.friend._id]);

  return (
    <div className="card card-compact shadow-xl bg-accent h-72 w-[30%] justify-around mb-5">
      <figure className="w-full h-2/3 absolute top-0">
        <ImageCarousel
          classNames=""
          time={3000}
          images={images.map((image) => image.url)}
        />
      </figure>
      <div className="card-body flex justify-end mb-2">
        <div className="flex align-center justify-around">
          <h2 className="flex items-center text-xl font-semibold">
            Name: {props.friend.nickName}
          </h2>
          <FriendDeleteButton />
        </div>
      </div>
    </div>
  );
};

export default FriendCard;
