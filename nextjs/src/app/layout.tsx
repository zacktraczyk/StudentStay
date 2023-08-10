import 'server-only'

import { cache } from 'react'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import ReactQueryProvider from './react-query-provider'
import SupabaseProvider from './supabase-provider'
import { cookies } from 'next/headers'
import { createServerComponentClient as _createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/database.types'
import SupabaseListener from './supabase-listener'
import { config } from '@fortawesome/fontawesome-svg-core'
config.autoAddCss = false

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'StudentStay',
  description: 'Placing Students in housing',
  icons: {
    icon: '/logo.svg',
  },
}

// do not cache this layout
export const revalidate = 0

export const createServerComponentClient = cache(() => {
  const cookieStore = cookies()
  return _createServerComponentClient<Database>({ cookies: () => cookieStore })
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = createServerComponentClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <html lang='en' className='h-full'>
      <body className={inter.className + ' h-full'}>
        <SupabaseProvider session={session}>
          <ReactQueryProvider>
            <SupabaseListener serverAccessToken={session?.access_token} />
            {children}
          </ReactQueryProvider>
        </SupabaseProvider>
      </body>
      <Analytics />
    </html>
  )
}
