import React from 'react';

import { getFriends } from '../../../util/api';
import { UserType } from '@/app/types';

import FindFriendsPage from '@/app/pages/FindFriendsPage';

export const dynamicParams = true;

const Page = async ({ params }: { params: { userId_query: string[] } }) => {
  if (params.userId_query.length > 1) {
    const userId = params.userId_query[0];
    const query = params.userId_query[1];
    const users = (await getFriends(query, userId, 'search'))
      .value as UserType[];
      
    return <FindFriendsPage users={users} />;
  }
  return <FindFriendsPage users={[]} />;
};

export default Page;
