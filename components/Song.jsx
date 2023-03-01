import useSpotify from '@/hooks/useSpotify';
import React from 'react';

const Song = ({ order, track }) => {
  const spotifyApi = useSpotify();

  return (
    <div>
      {order + 1}
      <img src={track.track.album.images[0].url} alt='' className='h-10 w-10' />
    </div>
  );
};

export default Song;
