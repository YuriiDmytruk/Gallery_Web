'use client';
import Link from 'next/link';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';

import LogIn from './LogIn';

import '../styles/NavBarAnimation.css';
import { UserType } from '../types';
import { deleteUser } from '../redux/ducks/user';

interface NavBarProps {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
}

const NavBar = (props: NavBarProps) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const userId = useSelector((state: UserType) => state._id);
  const active = !(userId === '');

  const logOut = () => {
    dispatch(deleteUser());
    router.replace('/');
  };

  const openModal = () => {
    props.setIsModalOpen(true);
  };

  const closeModal = () => {
    props.setIsModalOpen(false);
  };

  return (
    <div className="z-50">
      <div
        className={`navbar z-50 bg-primary fixed ${
          active
            ? 'rounded-lg mt-3 max-w-[90%] animation'
            : 'mt-0 max-w-[100%] left-0'
        }`}
      >
        <div className="flex-1">
          <Link
            href={active ? `/gallery` : '/'}
            className="btn btn-ghost normal-case text-xl accent-text"
          >
            My Galery
          </Link>
          {active ? (
            <div className="ml-10">
              <Link
                href="/popular"
                className="btn btn-ghost normal-case text-sm"
              >
                Popular Galery
              </Link>
              <Link
                href="/friends"
                className="btn btn-ghost normal-case text-sm"
              >
                My Friends
              </Link>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div
          className="btn btn-ghost normal-case text-sm"
          onClick={active ? logOut : openModal}
        >
          {active ? <span>LogOut</span> : <span>LogIn</span>}
        </div>
      </div>
      {props.isModalOpen && <LogIn closeModal={closeModal} />}
    </div>
  );
};

export default NavBar;
