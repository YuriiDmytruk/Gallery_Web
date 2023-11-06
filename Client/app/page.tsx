import { getImages } from './util/api';

import ImageCarousel from './components/ImageCarousel';

import {ImageType} from './types'

const Home = async () => {
  const images = (await getImages('', '20')).value as ImageType[];

  return (
    <div className="z-0 fixed w-[100%] h-[100%] top-0 left-0">
      <div className="z-20 fixed w-[100%] h-[100%] bg-black bg-opacity-60"></div>

      <div className="w-[60%] h-[50%] fixed top-0 right-0 z-0">
        <ImageCarousel
          time={3000}
          images={images.map((image: any) => image.url)}
          classNames=''
        />
      </div>

      <div className="w-[60%] h-[50%] fixed top-0 left-0 z-0">
        <ImageCarousel
          time={5000}
          images={images.map((image: any) => image.url)}
          classNames=''
        />
      </div>
      <div className="w-[60%] h-[50%] fixed bottom-0 left-0 z-0">
        <ImageCarousel
          time={4000}
          images={images.map((image: any) => image.url)}
          classNames=''
        />
      </div>
      <div className="w-[60%] h-[50%] fixed bottom-0 right-0 z-0">
        <ImageCarousel
          time={3500}
          images={images.map((image: any) => image.url)}
          classNames=''
        />
      </div>
      <div className="w-[100%] h-[100%] fixed flex justify-center items-center z-10">
        <div className="w-[30vw] h-[30vw] fixed m-auto">
          <ImageCarousel
            time={6000}
            images={images.map((image: any) => image.url)}
            classNames='rounded-full'
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
