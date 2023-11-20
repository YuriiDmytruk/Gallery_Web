'use client';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserType } from '../types';
import { deleteUser } from '../redux/ducks/user';
import { useRouter } from 'next/navigation';

interface LogInProps {
  closeModal: () => void;
  setTheme: (value: string) => void;
}

const Profile = (props: LogInProps) => {
  const userNickName = useSelector((state: UserType) => state.nickName);
  const userEmail = useSelector((state: UserType) => state.email);

  const dispatch = useDispatch()
  const router = useRouter()

  const logOut = () => {
    dispatch(deleteUser())
    props.closeModal()
    router.push('/')
  }

  return (
    <div>
      <dialog id="log_in_form" className="modal bg-black bg-opacity-60" open>
        <div className="modal-box bg-white justify-center items-center">
          <form method="dialog ">
            <button
              onClick={props.closeModal}
              className="btn btn-sm btn-circle btn-ghost absolute right-1 top-1"
            >
              ✕
            </button>
          </form>
          <div className="modal-box w-[100%] bg-white">
            <h3 className="font-bold text-lg text-center">
              Hello {userNickName}!!!
            </h3>
            <div className="form-control justify-center items-center max-w-[100%] mt-6">
              <div>
                <label className="label">
                  <span className="">Your email: {userEmail}</span>
                </label>
              </div>
            </div>
            <div className="flex flex-row form-control max-w-[100%] justify-center items-center mt-6">
              <div>
                <label className="label">
                  <span className="">You can choose theme here: </span>
                </label>
              </div>
              <div>
                <details className="dropdown">
                  <summary className="m-1 btn">Change theme</summary>
                  <ul className="p-2 bg-white menu dropdown-content z-[1] shadow rounded-box w-40">
                    <li>
                      <a onClick={() => {props.setTheme('custom')}}>Main</a>
                    </li>
                    <li>
                      <a onClick={() => {props.setTheme('dark')}}>Dark</a>
                    </li>
                    <li>
                      <a onClick={() => {props.setTheme('corporate')}}>Light</a>
                    </li>
                    <li>
                      <a onClick={() => {props.setTheme('cupcake')}}>Cupcake</a>
                    </li>       
                  </ul>
                </details>
              </div>
            </div>
            <div className="modal-action justify-center items-center mt-24">
              <button className='btn btn-warning' onClick={logOut}>Log Out</button>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Profile;
