'use client';
import React from 'react';
import { useSelector } from 'react-redux';

import ImageList from '../components/ImageList';
import PleaseLogIn from '../components/PleaseLogIn';

import { UserType } from '../types';


const GaleryPage = () => {
  const userId = useSelector((state: UserType) => state._id);

  return (
    <div className='h-full w-full pt-[7%] px-5'>
      {userId !== '' ? (
        <ImageList userId={userId ? userId : ''} amount="" />
      ) : (
        <PleaseLogIn />
      )}
    </div>
  );
};

export default GaleryPage;
