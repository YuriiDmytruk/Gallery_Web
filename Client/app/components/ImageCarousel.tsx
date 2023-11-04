'use client';
import React, { useState } from 'react';

import '../styles/ImageCarousel.css';
import {getRandomInt} from '../util/util'

interface ImageCarouselPropsType {
  images: string[];
  time: number;
  classNames: string;
}

const ImageCarousel = (props: ImageCarouselPropsType) => {
  const randomNumber = getRandomInt(0, props.images.length - 1)
  const [state, setState] = useState({
    image1Visible: true,
    image2Visible: false,
    prevImageId: randomNumber,
    curImageID: randomNumber + 1,
  });

  const changeImage = () => {
    setState({
      image1Visible: state.image2Visible,
      image2Visible: state.image1Visible,
      prevImageId: state.curImageID,
      curImageID:
        props.images.length - 1 === state.curImageID ? 0 : state.curImageID + 1,
    });
  };

  setTimeout(changeImage, props.time);

  return (
    <div className="w-[100%] h-[100%]">
      <div
        className={`w-[100%] h-[100%] absolute top-0 right-0 ${
          props.classNames
        } ${state.image1Visible ? 'fadeIn' : 'fadeOut'}`}
        style={{
          backgroundImage: `url("${
            props.images[
              state.image1Visible ? state.curImageID : state.prevImageId
            ]
          }")`,
          backgroundSize: 'cover',
        }}
      ></div>
      <div
        className={`w-[100%] h-[100%] absolute top-0 right-0 ${
          props.classNames
        } ${state.image2Visible ? 'fadeIn' : 'fadeOut'}`}
        style={{
          backgroundImage: `url("${
            props.images[
              state.image2Visible ? state.curImageID : state.prevImageId
            ]
          }")`,
          backgroundSize: 'cover',
        }}
      ></div>
    </div>
  );
};

export default ImageCarousel;
