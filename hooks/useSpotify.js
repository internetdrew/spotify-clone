import { useEffect } from 'react';
import spotifyApi from '@/lib/spotify';
import { useSession, signIn } from 'next-auth/react';
import { LOGIN_URL } from '@/lib/spotify';

const useSpotify = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session) {
      if (session.error === 'RefreshAccessTokenError') {
        console.log('Confirmed session has error value');

        signIn();
      }
    }

    spotifyApi.setAccessToken(session?.user?.accessToken);
  }, [session]);

  return spotifyApi;
};

export default useSpotify;
