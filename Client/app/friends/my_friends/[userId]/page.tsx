import React from 'react';

import { getFriends } from '../../../util/api';
import { UserType } from '@/app/types';
import FriendCard from '@/app/components/FriendCard';

export const dynamicParams = true;

const Page = async ({ params }: { params: { userId: string } }) => {
  const friends = (await getFriends('', params.userId, 'friends')).value as UserType[];
  return (
    <div className="h-full w-full pt-[7%] px-5">
      <div className="flex flex-wrap justify-around">
        {friends.map((friend) => (
          <FriendCard key={friend._id} friend={friend} />
        ))}
      </div>
    </div>
  );
};

export default Page;
