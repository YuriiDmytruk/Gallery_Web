import React from 'react';

import PleaseLogIn from '../../components/PleaseLogIn';
import ImageCard from '@/app/components/ImageCard';
import AddButton from '@/app/components/AddButton';

import { getImages } from '../../util/api';
import { ImageType } from '@/app/types';


export const dynamicParams = true;

async function fetchImages(userId: string) {
  let amount = '';
  if (userId === 'popular') {
    amount = '20';
    userId = '';
  }
  const res = await getImages(amount === '' ? userId : '', amount);

  return res;
}

const Page = async ({ params }: { params: { userId: string } }) => {
  const images = (await fetchImages(params.userId)).value as ImageType[];
  return (
    <div className="h-full w-full pt-[7%] px-5">
      {params.userId !== '' ? (
        <div>
          <div className="flex flex-wrap justify-around">
            {images.map((image) => (
              <ImageCard key={image._id} image={image} />
            ))}
          </div>
          {params.userId !== 'popular' ? <AddButton /> : <></>}
        </div>
      ) : (
        <PleaseLogIn />
      )}
    </div>
  );
};

export default Page;
