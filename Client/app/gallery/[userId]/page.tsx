import GalleryPage from '@/app/pages/GalleryPage';
import { getImages } from '@/app/util/api';
import { ImageType } from '@/app/types';

export const dynamicParams = true;

const Page = async ({ params }: { params: { userId: string } }) => {
  const images = (
    await getImages(
      params.userId === 'popular' ? '' : params.userId,
      params.userId === 'popular' ? '20' : ''
    )
  ).value as ImageType[];
  return <GalleryPage userId={params.userId} images={images} />;
};

export default Page;
