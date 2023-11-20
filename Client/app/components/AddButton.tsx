'use client';
import React, { useState } from 'react';
import { PlusLg } from 'react-bootstrap-icons';

import AddForm from '@/app/components/AddForm';

interface AddButtonProps{
  userId: string;
  userNickName: string;
}

const AddButton = (props: AddButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button
        onClick={openModal}
        className="fixed w-20 h-20 bottom-4 right-4 btn btn-ghost bg-primary rounded-full"
      >
        <PlusLg size={30} />
      </button>
      {isModalOpen && <AddForm closeModal={closeModal} userId={props.userId} userNickName={props.userNickName}/>}
    </div>
  );
};

export default AddButton;
