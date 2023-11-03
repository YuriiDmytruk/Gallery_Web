import Link from 'next/link';
import React from 'react';

import '../styles/NavBarAnimation.css';
import '../globals.css';

interface NavBarProps {
  active: boolean;
  setActive: (value: boolean) => void;
}

const NavBar = (props: NavBarProps) => {
  const onLogInClick = () => {
    props.setActive(!props.active);
  };

  return (
    <div
      className={
        props.active
          ? 'navbar  z-50 bg-primary mx-auto rounded-lg mt-3 max-w-[90%] animation'
          : 'navbar  z-50 bg-primary mx-auto mt-0 max-w-[100%]'
      }
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
      <div className="btn btn-ghost normal-case text-sm" onClick={onLogInClick}>
        Log in
      </div>
    </div>
  );
};

export default NavBar;
