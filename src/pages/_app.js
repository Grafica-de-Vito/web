import { Inter } from '@next/font/google'
import { NextUIProvider } from '@nextui-org/react';
import { Navbar } from '@/components';

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <main className={inter.className}>
        <Navbar />
        <Component {...pageProps} />
      </main>
    </NextUIProvider>
  );
}
