'use client';
import React from 'react';
import { PlusLg } from 'react-bootstrap-icons';

const AddButton = () => {
  return (
    <button className="fixed w-20 h-20 bottom-4 right-4 btn btn-ghost bg-primary rounded-full">
      <PlusLg size={30} />
    </button>
  );
};

export default AddButton;
