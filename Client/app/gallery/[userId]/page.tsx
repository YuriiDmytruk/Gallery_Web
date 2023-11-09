import React from 'react';

import PleaseLogIn from '../../components/PleaseLogIn';
import ImageCard from '@/app/components/ImageCard';
import AddButton from '@/app/components/AddButton';

import { getImages } from '../../util/api';
import { ImageType } from '@/app/types';

export const dynamicParams = true;

const fetchImages = async (userId: string) => {
  let amount = '';
  if (userId === 'popular') {
    amount = '20';
    userId = '';
  }
  const res = await getImages(amount === '' ? userId : '', amount);

  return res;
};

const Page = async ({ params }: { params: { userId: string } }) => {
  if (params.userId !== undefined) {
    const images = (await fetchImages(params.userId)).value as ImageType[];

    return (
      <div className="h-full w-full pt-[7%] px-5">
        {params.userId !== '' ? (
          <div>
            <div className="flex flex-wrap justify-around">
              {images.map((image) => (
                <ImageCard key={image._id} image={image} page={params.userId} />
              ))}
            </div>
            {params.userId !== 'popular' ? <AddButton /> : <></>}
          </div>
        ) : (
          <PleaseLogIn />
        )}
      </div>
    );
  }
  return <></>;
};

export default Page;
