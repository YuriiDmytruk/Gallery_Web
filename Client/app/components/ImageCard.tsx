import React from 'react';
import Image from 'next/image';

import ImageRating from './ImageRating';

import { ImageType } from '../types';
import ImageDeleteButton from './ImageDeleteButton';

interface ImageCardProps {
  image: ImageType;
}

const ImageCard = (props: ImageCardProps) => {
  return (
    <div className="card card-compact shadow-xl bg-accent h-80 w-[30%] justify-around mb-5">
      <figure className='w-full'>
        <Image
          src={props.image.url}
          alt={props.image.description}
          layout="responsive"
          width={500}
          height={500}
        />
      </figure>
      <div className="card-body flex justify-end">
        <div className="flex align-center justify-around">
          <h2 className="flex items-center text-xl font-semibold">Author: {props.image.authorName}</h2>
          <ImageRating image={props.image} />
          <ImageDeleteButton imageId={props.image._id} />
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
