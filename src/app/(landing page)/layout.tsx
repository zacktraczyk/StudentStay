import Header from './header'
import Footer from './footer'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'

import '../globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'StudentStay',
    description: 'Placing Students in housing',
    icons: {
        icon: '/logo.svg',
    },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en' className='h-full'>
            <body className={inter.className + ' h-full'}>
                <Header />
                {children}
                <Footer />
            </body>
            <Analytics />
        </html>
    )
}
