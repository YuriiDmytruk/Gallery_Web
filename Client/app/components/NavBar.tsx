'use client';
import Link from 'next/link';
import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter, usePathname  } from 'next/navigation';

import LogIn from '@/app/components/LogIn';

import '@/app/styles/NavBarAnimation.css';
import { UserType } from '@/app/types';
import { deleteUser } from '@/app/redux/ducks/user';

const NavBar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname()

  const [isModalOpen, setIsModalOpen] = useState(false);
  const userId = useSelector((state: UserType) => state._id);
  const active = (pathname !== '/')

  const logOut = () => {
    dispatch(deleteUser());
    router.replace('/');
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
            href={active ? `/gallery/${userId}` : '/'}
            className="btn btn-ghost normal-case text-xl accent-text"
          >
            My Galery
          </Link>
          {active ? (
            <div className="ml-10">
              <Link
                href="/gallery/popular"
                className="btn btn-ghost normal-case text-sm"
              >
                Popular Galery
              </Link>
              <Link
                href={`/friends/my_friends/${userId}`}
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
      {isModalOpen && <LogIn closeModal={closeModal} />}
    </div>
  );
};

export default NavBar;
