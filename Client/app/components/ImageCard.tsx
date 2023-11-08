"use client"
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';

import { ImageType, UserType } from '../types';
import { putScore } from '../util/api';



interface ImageCardProps {
  image: ImageType;
}

const ImageCard = (props: ImageCardProps) => {
  const userId = useSelector((state: UserType) => state._id);
  const [checked, setChecked] = useState(Math.ceil(props.image.score));

  const disabled = userId === props.image.authorId;

  const handleRadioChange = (value: number) => {
    if (!disabled) {
      putScore(props.image._id, userId, value)
      setChecked(value);
    }
  };

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
          <div className="rating gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <input
                key={index}
                type="radio"
                className={`mask mask-star-2 ${
                  disabled ? 'bg-orange-200' : 'bg-orange-500'
                }`}
                onClick={() => handleRadioChange(index)}
                checked={checked === index}
                onChange={() => {}}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
