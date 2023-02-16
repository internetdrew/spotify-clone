import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import Sidebar from '@/components/Sidebar';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <div className='bg-black h-screen overflow-hidden'>
      <main>
        <Sidebar />
        {/* center */}
      </main>

      <div>{/* Player */}</div>
    </div>
  );
}
