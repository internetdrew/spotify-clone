import { playlistState } from '@/atoms/playlistAtom';
import { useRecoilValue } from 'recoil';
import Song from './Song';

const Songs = () => {
  const playlist = useRecoilValue(playlistState);
  console.log(playlist);

  return (
    <div>
      {playlist?.tracks.items.map((trackItem, i) => (
        <Song key={trackItem.track.id} track={trackItem} order={i} />
      ))}
    </div>
  );
};

export default Songs;
