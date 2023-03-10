import { useState, useEffect } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import { shuffle } from 'lodash';
import { useRecoilState, useRecoilValue } from 'recoil';
import { playlistIdState, playlistState } from '@/atoms/playlistAtom';
import useSpotify from '@/hooks/useSpotify';
import Songs from './Songs';
import { signOut } from 'next-auth/react';

const colors = [
  'from-indigo-500',
  'from-blue-500',
  'from-green-500',
  'from-red-500',
  'from-yellow-500',
  'from-pink-500',
  'from-purple-500',
];

const Center = () => {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const [color, setColor] = useState(null);
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [playlistId]);

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then(data => setPlaylist(data.body))
      .catch(error => console.error(`Something went wrong: ${error}`));
  }, [spotifyApi, playlistId]);

  return (
    <div className='flex-grow h-screen pb-10'>
      <header className='absolute top-5 right-8'>
        <div
          className='flex items-center bg-black text-white space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-3'
          onClick={signOut}
        >
          <img className='rounded-full w-10 h-10' src='' alt='' />
          <h2>{session?.user?.name}</h2>
          <ChevronDownIcon className='w-5' />
        </div>
      </header>
      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}
      >
        <img
          src={playlist?.images?.[0]?.url}
          alt=''
          className='h-44 w-44 shadow-2xl'
        />
        <div>
          <h1 className='text-2xl md:text-3xl lg:text-5xl'>{playlist?.name}</h1>
        </div>
      </section>
      <div className='h-full overflow-y-scroll scrollbar-hide'>
        <Songs />
      </div>
    </div>
  );
};

export default Center;
