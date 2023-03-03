import useSpotify from '@/hooks/useSpotify';
import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { currentTrackIdState, isPlayingState } from '@/atoms/songAtom';
import useSongInfo from '@/hooks/useSongInfo';

const Player = () => {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(50);
  const songInfo = useSongInfo();

  console.log(songInfo);

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

  useEffect(() => {
    if (spotifyApi.getAccessToken && !currentTrackId) {
      fetchCurrentSong();
      setVolume(50);
    }
  }, [currentTrackId, spotifyApi, session]);

  return (
    <div className='h-24 bg-gradient-to-b from-black to-gray-900 text-white'>
      {/* left */}
      <div>
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
    </div>
  );
};

export default Player;