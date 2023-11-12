'use client';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Search } from 'react-bootstrap-icons';
import { useRouter } from 'next/navigation';

import FriendCard from '@/app/components/FriendCard';

import { UserState, UserType } from '@/app/types';

interface FindFriendsPageProps {
  users: UserType[];
}

const FindFriendsPage = (props: FindFriendsPageProps) => {
  const [query, setQuery] = useState('');
  const userId = useSelector((state: UserState) => state._id);

  const router = useRouter();

  const onSearchClick = () => {
    router.push(`/friends/find_friends/${userId}/${query}`);
  };

  return (
    <div className="h-full w-full pt-[7%] px-5">
      <div className="mb-4 flex items-center justify-center gap-4">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          placeholder="Search for new friends"
          className="input input-bordered input-warning w-full max-w-xs"
        />

        <button
          className="btn btn-active btn-primary rounded-full"
          onClick={onSearchClick}
        >
          <Search size={20} />
        </button>
      </div>
      {props.users.length > 0 ? (
        <div className="flex flex-wrap justify-around">
          {props.users.map((user) => (
            <FriendCard key={user._id} friend={user} userId={userId} mod='user'/>
          ))}
        </div>
      ) : (
        <div className="flex w-full h-2/3 items-center justify-center text-3xl font-bold">
          No users with this nickName
        </div>
      )}
    </div>
  );
};

export default FindFriendsPage;
