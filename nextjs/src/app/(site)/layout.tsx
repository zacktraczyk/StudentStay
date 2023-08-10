import Footer from './footer'
import Header from './header'
import { createServerComponentClient } from '../layout'

export default async function Layout({ children }: { children: React.ReactNode }) {
  const supabase = createServerComponentClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <>
      <Header session={session} />
      {children}
      <Footer />
    </>
  )
}
