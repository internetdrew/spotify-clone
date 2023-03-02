import useSpotify from '@/hooks/useSpotify';
import { millisToMinsAndSecs } from '@/lib/time';
import { currentTrackIdState, isPlayingState } from '@/atoms/songAtom';
import { useRecoilState } from 'recoil';

const Song = ({ offset, track, playlist }) => {
  const spotifyApi = useSpotify();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const playSong = () => {
    setCurrentTrackId(track.track.id);
    setIsPlaying(true);
    spotifyApi
      .play({ context_uri: playlist?.uri, offset: { position: offset } })
      .then(data => console.log(data))
      .catch(err => console.error(err));
  };

  return (
    <div className='grid grid-cols-2 py-4 px-5 hover:bg-gray-500 rounded-lg cursor-pointer'>
      <div className='flex items-center space-x-4' onClick={playSong}>
        <p>{offset + 1}</p>
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
