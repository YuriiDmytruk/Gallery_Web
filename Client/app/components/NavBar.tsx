'use client';
import Link from 'next/link';
import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { useRouter, usePathname  } from 'next/navigation';

import LogIn from '@/app/components/LogIn';

import '@/app/styles/NavBarAnimation.css';
import { UserType } from '@/app/types';
import Profile from './Profile';

interface NavBarProps {
  setTheme: (value: string) => void;
}

const NavBar = (props: NavBarProps) => {
  const router = useRouter();
  const pathname = usePathname()

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const userId = useSelector((state: UserType) => state._id);
  const userNickName = useSelector((state: UserType) => state.nickName);
  const active = (pathname !== '/')

  useEffect(() => {
    if(userId === ''){
      router.push('/')
    }
  }, [userId, router])

  const openLogIn = () => {
    setIsLoginOpen(true);
  };

  const closeLogIn = () => {
    setIsLoginOpen(false);
  };

  const openProfile = () => {
    setIsProfileOpen(true);
  };

  const closeProfile = () => {
    setIsProfileOpen(false);
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
              <Link
                href={`/friends/find_friends/${userId}`}
                className="btn btn-ghost normal-case text-sm"
              >
                Find Friends
              </Link>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div
          className="btn btn-ghost normal-case text-sm"
          onClick={active ? openProfile : openLogIn}
        >
          {active ? <span>{userNickName}</span> : <span>LogIn</span>}
        </div>
      </div>
      {isLoginOpen && <LogIn closeModal={closeLogIn} />}
      {isProfileOpen && <Profile closeModal={closeProfile} setTheme={props.setTheme}/>}
    </div>
  );
};

export default NavBar;
