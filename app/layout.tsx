import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navigation from './components/navigation'
import { ToastContainer } from 'react-toastify';
import { Providers } from './providers';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/navigation/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Rasmus Lagerqvist',
  description: 'I&apos;m a software engineer from Helsinki, Finland. This is my website and portfolio.'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen bg-white dark:bg-black scroll-smooth`}>
        <Providers>
          <Navigation />
          <main className="flex-grow">{children}</main>
          <ToastContainer />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
