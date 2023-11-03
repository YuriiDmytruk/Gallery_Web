import Link from 'next/link';
import React from 'react';

import '../styles/NavBarAnimation.css';

interface NavBarProps {
  active: boolean;
  setActive: (value: boolean) => void;
}

const NavBar = (props: NavBarProps) => {
  console.log({...props})
  
  const onLogInClick = () => {
    props.setActive(!props.active);
  };

  return (
    <div>
      <div
        className={
          props.active
            ? 'navbar bg-accent mx-auto rounded-lg mt-3 max-w-[90%] animation'
            : 'navbar bg-accent mx-auto rounded-lg mt-0 max-w-[100%]'
        }
      >
        <div className="flex-1">
          <Link href="/galery" className="btn btn-ghost normal-case text-xl">
            Galery
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
        <div
          className="btn btn-ghost normal-case text-sm"
          onClick={onLogInClick}
        >
          Log in
        </div>
      </div>
    </div>
  );
};

export default NavBar;
