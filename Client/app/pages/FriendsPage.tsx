'use client';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { UserState, UserType } from '@/app/types';
import FriendCard from '@/app/components/FriendCard';

import { setFriends } from '@/app/redux/ducks/user';

interface FriendsPageProps {
  friends: UserType[];
}

const FriendsPage = (props: FriendsPageProps) => {
  const dispatch = useDispatch();

  const userId= useSelector((state: UserState) => state._id);

  const friends = useSelector((state: UserState) => state.friends);
  useEffect(() => {
    if (friends.length === 0) {
      dispatch(setFriends(props.friends));
    }
  }, [dispatch, friends.length, props.friends]);

  return (
    <div className="h-full w-full pt-[7%] px-5">
      <div className="flex flex-wrap justify-around">
        {friends.map((friend) => (
          <FriendCard key={friend._id} friend={friend} userId={userId} mod='friend'/>
        ))}
      </div>
    </div>
  );
};

export default FriendsPage;
