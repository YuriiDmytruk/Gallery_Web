import Link from 'next/link';
import React from 'react';

const NavBar = () => {
  return (
    <div className="navbar bg-accent mx-auto mt-3 max-w-[90%] rounded-lg">
      <div className="flex-1">
        <Link href="/galery" className="btn btn-ghost normal-case text-xl">
          Galery
        </Link>
        <div className="ml-10">
          <Link href="/popular" className="btn btn-ghost normal-case text-sm">
            Popular Galery
          </Link>
          <Link href="/friends" className="btn btn-ghost normal-case text-sm">My Friends</Link>
        </div>
      </div>
      <div className="btn btn-ghost normal-case text-sm">
        <div>Log in</div>
      </div>
    </div>
  );
};

export default NavBar;
