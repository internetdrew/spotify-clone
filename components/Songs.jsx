import { playlistState } from '@/atoms/playlistAtom';
import { useRecoilValue } from 'recoil';

const Songs = () => {
  const playlist = useRecoilValue(playlistState);

  return <div>Songs</div>;
};

export default Songs;
