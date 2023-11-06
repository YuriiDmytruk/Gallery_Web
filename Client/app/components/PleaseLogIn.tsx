import React from 'react';
import Link from 'next/link';

const PleaseLogIn = () => {
  return (
    <div className="w-full h-full flex justify-center items-center text-2xl">
      Oops, it looks like you are not logged in. Please follow this
      <Link className="m-2 link link-success" href="/">
        {' '}
        LINK{' '}
      </Link>
      and log in !!!
    </div>
  );
};

export default PleaseLogIn;
