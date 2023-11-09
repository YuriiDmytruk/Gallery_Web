import React from 'react';
import Image from 'next/image';

import ImageRating from './ImageRating';

import { ImageType } from '../types';

interface ImageCardProps {
  image: ImageType;
}

const ImageCard = (props: ImageCardProps) => {
  return (
    <div className="card card-compact shadow-xl bg-accent h-80 w-[30%] justify-around mb-5">
      <figure style={{ width: '100%' }}>
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
          <h2 className="card-title">Author: {props.image.authorName}</h2>
          <ImageRating image={props.image} />
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
