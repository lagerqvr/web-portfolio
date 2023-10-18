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
  description: 'Personal website and portfolio for Rasmus Lagerqvist.'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='scroll-smooth'>
      <body className={`${inter.className} flex flex-col min-h-screen bg-white dark:bg-black`}>
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
