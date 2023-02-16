import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import Sidebar from '@/components/Sidebar';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Spotify 2.0</title>
        <meta
          name='description'
          content='A fresh build of Spotify using Next JS'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <h1>Spotify</h1>

      <main>
        <Sidebar />
        {/* center */}
      </main>

      <div>{/* Player */}</div>
    </>
  );
}
