'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';

import ImageCarousel from '@/app/components/ImageCarousel';

import { ImageType, UserType } from '@/app/types';
import { getImages, patchFriend } from '@/app/util/api';
import { addFriend, deleteFriend } from '@/app/redux/ducks/user';

interface FriendCardProps {
  friend: UserType;
  userId: string;
  mod: string;
}

const FriendCard = (props: FriendCardProps) => {
  const [images, setImages] = useState<ImageType[]>([]);

  const [disableAdd, setDisableAdd] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchImages = async () => {
      const images = (await getImages(props.friend._id, ''))
        .value as ImageType[];
      setImages(images as ImageType[]);
    };

    fetchImages();
  }, [props.friend._id]);

  const onDeleteClick = async () => {
    const result = await patchFriend(props.userId, props.friend._id, 'delete');
    if (result.statusCode === 200) {
      dispatch(deleteFriend(props.friend._id));
    }
  };

  const onAddClick = async () => {
    const result = await patchFriend(props.userId, props.friend._id, 'add');
    if (result.statusCode === 200) {
      setDisableAdd(true)
      dispatch(addFriend(props.friend));
    }
  };

  const onGaleryClick = () => {
    router.push(`/gallery/${props.friend._id}`);
  };

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
          {props.mod === 'friend' ? (
            <button className="btn btn-error" onClick={onDeleteClick}>
              Delete friend
            </button>
          ) : (
            <button className="btn btn-primary" disabled={disableAdd} onClick={onAddClick}>
              Add friend
            </button>
          )}
          <button className="btn btn-success" onClick={onGaleryClick}>
            Gallery
          </button>
        </div>
      </div>
    </div>
  );
};

export default FriendCard;
