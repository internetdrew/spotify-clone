import useSpotify from '@/hooks/useSpotify';
import React from 'react';
import { millisToMinsAndSecs } from '@/lib/time';

const Song = ({ order, track }) => {
  const spotifyApi = useSpotify();
  console.log(track);

  return (
    <div className='grid grid-cols-2 py-4 px-5 hover:bg-gray-500 rounded-lg cursor-pointer'>
      <div className='flex items-center space-x-4'>
        <p>{order + 1}</p>
        <img
          src={track?.track.album.images[0].url}
          alt=''
          className='h-10 w-10'
        />
        <div>
          <p className='w-36 lg:w-64 truncate'>{track?.track.name}</p>
          <p>{track?.track.artists[0].name}</p>
        </div>
      </div>

      <div className='flex items-center justify-between ml-auto md:ml-0'>
        <p className='w-40 hidden md:inline'>{track?.track.album.name}</p>
        <p>{millisToMinsAndSecs(track?.track.duration_ms)}</p>
      </div>
    </div>
  );
};

export default Song;
