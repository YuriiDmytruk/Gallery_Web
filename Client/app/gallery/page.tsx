'use client';
import React from 'react';
import { useSelector } from 'react-redux';

import ImageList from '../components/ImageList';
import PleaseLogIn from '../components/PleaseLogIn';
import { PlusLg } from 'react-bootstrap-icons';

import { UserType } from '../types';

const GaleryPage = () => {
  const userId = useSelector((state: UserType) => state._id);

  return (
    <div className="h-full w-full pt-[7%] px-5">
      {userId !== '' ? (
        <div>
        <ImageList userId={userId ? userId : ''} amount="" />
        <button className="fixed w-20 h-20 bottom-4 right-4 btn btn-ghost bg-primary rounded-full">
          <PlusLg size={30} />
        </button>
        </div>
      ) : (
        <PleaseLogIn />
      )}
    </div>
  );
};

export default GaleryPage;
