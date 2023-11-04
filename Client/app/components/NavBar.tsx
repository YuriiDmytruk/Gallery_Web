import Link from 'next/link';
import React from 'react';

import LogIn from './LogIn';

import '../styles/NavBarAnimation.css';
import '../globals.css';

interface NavBarProps {
  active: boolean;
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  setActive: (value: boolean) => void;
}

const NavBar = (props: NavBarProps) => {

  const openModal = () => {
    props.setIsModalOpen(true);
  };

  const closeModal = () => {
    props.setIsModalOpen(false);
  };

  return (
    <div className='z-50'>
      <div
        className={`navbar z-50 bg-primary fixed ${
          props.active
            ? 'rounded-lg mt-3 max-w-[90%] animation'
            : 'mt-0 max-w-[100%] left-0'
        }`}
      >
        <div className="flex-1">
          <Link
            href="/galery"
            className="btn btn-ghost normal-case text-xl accent-text"
          >
            My Galery
          </Link>
          <div className="ml-10">
            <Link href="/popular" className="btn btn-ghost normal-case text-sm">
              Popular Galery
            </Link>
            <Link href="/friends" className="btn btn-ghost normal-case text-sm">
              My Friends
            </Link>
          </div>
        </div>
        <div className="btn btn-ghost normal-case text-sm" onClick={openModal}>
          Log in
        </div>
      </div>
      {props.isModalOpen && (
        <LogIn closeModal={closeModal} setActive={props.setActive} />
      )}
    </div>
  );
};

export default NavBar;
