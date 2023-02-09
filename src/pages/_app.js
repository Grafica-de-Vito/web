import { Inter } from '@next/font/google'
import { NextUIProvider } from '@nextui-org/react';

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <main className={inter.className}>
        <Component {...pageProps} />
      </main>
    </NextUIProvider>
  );
}
