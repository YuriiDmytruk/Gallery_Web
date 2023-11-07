'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';

import { putUser } from '../util/api';
import { addUser } from '../redux/ducks/user';
import { UserType } from '../types';

interface LogInProps {
  closeModal: () => void;
}

const LogIn = (props: LogInProps) => {
  const [user, setUser] = useState({
    email: 'yuriydmytrukr@gmail.com',
    password: '1111',
  });
  const router = useRouter();
  const dispatch = useDispatch();

  const onLogInClick = async () => {
    const response = await putUser(user);
    const loggedInUser = response.value as UserType;
    if (response !== null) {
      dispatch(addUser(loggedInUser));
      router.replace('/gallery');
    } else {
      alert('Wrong password or email');
    }
    props.closeModal();
  };

  return (
    <div>
      <dialog id="log_in_form" className="modal " open>
        <div className="modal-box bg-white justify-center items-center">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-1 top-1">
              ✕
            </button>
          </form>
          <div className="modal-box w-[100%]">
            <h3 className="font-bold text-lg text-center">
              Hello! Please Log in
            </h3>
            <div className="form-control max-w-[100%] justify-center items-center mt-6">
              <div>
                <label className="label">
                  <span className="">What is your email?</span>
                </label>
                <input
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  value={user.email}
                  type="text"
                  placeholder="Email"
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
            </div>
            <div className="form-control max-w-[100%] justify-center items-center mt-6">
              <div>
                <label className="label">
                  <span className="">What is your password?</span>
                </label>
                <input
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  value={user.password}
                  type="password"
                  placeholder="Password"
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
            </div>
            <div className="mt-3">
              <label className="label justify-center items-center">
                <span className="">
                  Dont have account then{' '}
                  <span className="text-blue-600 dark:text-blue-500 hover:underline cursor-pointer">
                    register
                  </span>
                  !!!
                </span>
              </label>
            </div>
            <div className="modal-action justify-center items-center">
              <form method="dialog">
                <button className="btn" onClick={onLogInClick}>
                  LogIn
                </button>
              </form>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default LogIn;
