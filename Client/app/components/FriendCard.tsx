import React from 'react';

import ImageCarousel from './ImageCarousel';

import { ImageType, UserType } from '../types';
import { getImages } from '../util/api';
import FriendDeleteButton from './FriendDeleteButton';

interface FriendCardProps {
  friend: UserType;
}

const FriendCard = async(props: FriendCardProps) => {
  const images = (await getImages(props.friend._id, '')).value as ImageType[];
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
