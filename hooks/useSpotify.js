import { useEffect } from 'react';
import spotifyApi from '@/lib/spotify';
import { useSession, signIn } from 'next-auth/react';

const useSpotify = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (!session) return;

    if (session.error === 'RefreshAccessTokenError') {
      console.log('Confirmed session has error value');

      signIn();
      return;
    }

    spotifyApi.setAccessToken(session.user.accessToken);
  }, [session]);

  return spotifyApi;
};

export default useSpotify;
