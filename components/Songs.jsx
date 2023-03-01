import { playlistState } from '@/atoms/playlistAtom';
import { useRecoilValue } from 'recoil';
import Song from './Song';

const Songs = () => {
  const playlist = useRecoilValue(playlistState);

  return (
    <div className='px-8 flex flex-col space-y-1 pb-28 text-white'>
      {playlist?.tracks.items.map((trackItem, i) => (
        <Song key={trackItem.track.id} track={trackItem} order={i} />
      ))}
    </div>
  );
};

export default Songs;
