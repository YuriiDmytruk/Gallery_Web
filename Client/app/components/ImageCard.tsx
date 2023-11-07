import React, { useState } from 'react';

import { ImageType } from '../types';
import Image from 'next/image';

interface ImageCardProps {
  image: ImageType;
}

const ImageCard = (props: ImageCardProps) => {
  const [checked, setChecked] = useState(Math.ceil(props.image.score));

  const handleRadioChange = (value: number) => {
    setChecked(value);
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
                className={`mask mask-star-2 bg-orange-400`}
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
