import { playlistState } from '@/atoms/playlistAtom';
import { useRecoilValue } from 'recoil';
import Song from './Song';

const Songs = () => {
  const playlist = useRecoilValue(playlistState);
  const validTracks = playlist?.tracks.items.filter(
    track => track.track !== null
  );

  return (
    <div className='px-8 flex flex-col space-y-1 pb-28 text-white'>
      {validTracks
        ? validTracks.map((track, i) => (
            <Song
              key={track?.track?.id}
              track={track}
              offset={i}
              playlist={playlist}
            />
          ))
        : null}
    </div>
  );
};

export default Songs;
