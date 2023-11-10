'use client';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { ImageType } from '../types';
import { postImage } from '../util/api';
import { addImage } from '../redux/ducks/user';

interface AddFormProps {
  userId: string;
  userNickName: string;
  closeModal: () => void;
}

const AddForm = (props: AddFormProps) => {
  const [image, setImage] = useState({
    url: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D',
    description: 'Some description',
    authorName: props.userNickName,
    authorId: props.userId,
  });
  const dispatch = useDispatch();

  const onAddClick = async () => {
    const result = await postImage(image);
    dispatch(addImage(result.value as ImageType));
    console.log(result.value);
    props.closeModal();
  };

  return (
    <dialog id="add_form" className="modal bg-black bg-opacity-60" open>
      <div className="modal-box bg-white justify-center items-center">
        <form method="dialog">
          <button
            onClick={props.closeModal}
            className="btn btn-sm btn-circle btn-ghost absolute right-1 top-1"
          >
            ✕
          </button>
        </form>
        <div className="modal-box w-[100%]">
          <h3 className="font-bold text-base text-center">
            Hello! Please add information about your new image
          </h3>
          <div className="form-control max-w-[100%] justify-center items-center mt-6">
            <div>
              <label className="label">
                <span className="">Image URL</span>
              </label>
              <input
                onChange={(e) => setImage({ ...image, url: e.target.value })}
                value={image.url}
                type="text"
                placeholder="URL"
                className="input input-bordered w-full max-w-xs"
              />
            </div>
          </div>
          <div className="form-control max-w-[100%] justify-center items-center mt-6">
            <div>
              <label className="label">
                <span className="">Image Description</span>
              </label>
              <input
                onChange={(e) =>
                  setImage({ ...image, description: e.target.value })
                }
                value={image.description}
                type="text"
                placeholder="Description"
                className="input input-bordered w-full max-w-xs"
              />
            </div>
          </div>
          <div className="mt-3"></div>
          <div className="modal-action justify-center items-center">
            <form method="dialog">
              <button className="btn" onClick={onAddClick}>
                Add
              </button>
            </form>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default AddForm;
