import React from 'react';

import { getFriends } from '../../../util/api';
import { UserType } from '@/app/types';

import FriendsPage from '@/app/pages/FriendsPage';

export const dynamicParams = true;

const Page = async ({ params }: { params: { userId: string } }) => {
  if (params.userId !== 'undefined') {
    const friends = (await getFriends('', params.userId, 'friends'))
      .value as UserType[];

    return <FriendsPage friends={friends} />;
  }
};

export default Page;
