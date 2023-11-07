import React, { useState, useEffect } from 'react';

import ImageCard from './ImageCard';

import { getImages } from '../util/api';
import { ImageType } from '../types';

interface ImageListProps {
  userId: string;
  amount: string;
}

const ImageList = (props: ImageListProps) => {
  const [images, setImages] = useState<ImageType[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      const result = (
        await getImages(props.amount === '' ? props.userId : '' , props.amount)
      ).value as ImageType[];
      setImages(result);
    };
    fetchImages();
  }, [props.userId, props.amount]);

  console.log('GET IMAGE');
  return (
    <div className="flex flex-wrap justify-around">
      {images.map((image) => (
        <ImageCard key={image._id} image={image} userId={props.userId} />
      ))}
    </div>
  );
};

export default ImageList;
