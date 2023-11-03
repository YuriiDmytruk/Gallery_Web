import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className='z-0 absolute w-[100%] h-[100%]'>
      <div className='z-20 absolute w-[100%] h-[100%] bg-black bg-opacity-50'></div>
      <div className="w-[60%] h-[50%] bg-red-400 absolute top-0 right-0 z-0"></div>
      <div className="w-[60%] h-[50%] bg-red-500 absolute top-0 left-0 z-0"></div>
      <div className="w-[60%] h-[50%] bg-red-600 absolute bottom-0 left-0 z-0"></div>
      <div className="w-[60%] h-[50%] bg-red-700 absolute bottom-0 right-0 z-0"></div>
      <div className="w-[100%] h-[100%] absolute flex justify-center items-center z-10">
        <div className="w-[30vw] h-[30vw] bg-red-800 absolute m-auto rounded-full"></div>
      </div>
    </div>
  );
}
