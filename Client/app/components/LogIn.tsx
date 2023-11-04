'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import { putUser } from '../util/api';

interface LogInProps {
  closeModal: () => void;
  setActive: (value: boolean) => void;
}

const LogIn = (props: LogInProps) => {

  const router = useRouter();

  const [user, setUser] = useState({
    email: 'yuriydmytrukr@gmail.com',
    password: '1111',
  });

  const onLogInClick = async () => {
    const response = await putUser(user);
    if (response !== null) {
      console.log(response);
      sessionStorage.setItem('USER', JSON.stringify(response.statusCode));
      router.replace('/galery')
      props.setActive(true);
    } else {
      alert('Wrong password or email');
    }
    props.closeModal();
  };

  return (
    <div>
      <dialog id="log_in_form" className="modal" open>
        <div className="modal-box bg-white justify-center items-center w-[30%]">
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
                onChange={(e) => setUser({ ...user, password: e.target.value })}
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
      </dialog>
    </div>
  );
};

export default LogIn;
