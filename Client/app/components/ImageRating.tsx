'use client';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

import { putScore } from '@/app/util/api';
import { ImageType, UserType } from '@/app/types';

interface ImageRatingProps {
  image: ImageType;
}

const ImageRating: any = (props: ImageRatingProps) => {
  const router = useRouter();

  const userId = useSelector((state: UserType) => state._id);
  const [checked, setChecked] = useState(Math.ceil(props.image.score));

  if (userId === '') {
    router.replace('/');
  }

  const handleRadioChange = (value: number) => {
    if (!disabled) {
      putScore(props.image._id, userId, value);
      setChecked(value);
    }
  };

  const disabled = userId === props.image.authorId;
  return (
    <div className="flex rating gap-1 items-center">
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
  );
};

export default ImageRating;
