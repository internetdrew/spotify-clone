import useSpotify from '@/hooks/useSpotify';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { currentTrackIdState, isPlayingState } from '@/atoms/songAtom';
import useSongInfo from '@/hooks/useSongInfo';
import {
  IoShuffle,
  IoPlaySkipBackSharp,
  IoPlayCircle,
  IoPauseCircleSharp,
  IoPlaySkipForwardSharp,
  IoRepeatSharp,
} from 'react-icons/io5';

const Player = () => {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(50);
  const songInfo = useSongInfo();

  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then(data => {
        console.log(`Now playing: ${data.body?.item?.id}`);
        setCurrentTrackId(data.body?.item?.id);
      });

      spotifyApi
        .getMyCurrentPlaybackState()
        .then(data => setIsPlaying(data.body?.is_playing));
    }
  };

  async function handlePlayPause() {
    await spotifyApi.getMyCurrentPlaybackState().then(data => {
      if (data.body.is_playing) {
        spotifyApi.pause();
        setIsPlaying(false);
      }

      if (!data.body.is_playing) {
        spotifyApi.play();
        setIsPlaying(true);
      }
    });
  }

  useEffect(() => {
    if (spotifyApi.getAccessToken && !currentTrackId) {
      fetchCurrentSong();
      setVolume(50);
    }
  }, [currentTrackId, spotifyApi, session]);

  return (
    <div className='h-24 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8 items-center'>
      {/* left */}
      {songInfo ? (
        <div className='flex items-center space-x-4'>
          <img
            src={songInfo?.album.images?.[0].url}
            alt={`${songInfo?.name} album art`}
            className='hidden md:inline h-10 w-10'
          />
          <div>
            <h3>{songInfo?.name}</h3>
            <p>{songInfo?.artists?.[0]?.name}</p>
          </div>
        </div>
      ) : null}
      {/* center */}
      <div className='text-white flex items-center justify-evenly'>
        <IoShuffle className='button' />
        <IoPlaySkipBackSharp className='button' />
        {isPlaying ? (
          <IoPauseCircleSharp
            onClick={() => handlePlayPause()}
            className='button large'
          />
        ) : (
          <IoPlayCircle
            onClick={() => handlePlayPause()}
            className='button large'
          />
        )}
        <IoPlaySkipForwardSharp className='button' />
        <IoRepeatSharp className='button' />
      </div>
    </div>
  );
};

export default Player;
