import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import Sidebar from '@/components/Sidebar';
import Center from '@/components/Center';
import useSpotify from '@/hooks/useSpotify';
import { getSession } from 'next-auth/react';

export default function Home() {
  return (
    <div className='bg-black h-screen overflow-hidden'>
      <main className='flex'>
        <Sidebar />
        <Center />
      </main>

      <div>{/* Player */}</div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
