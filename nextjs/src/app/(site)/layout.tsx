import Footer from './footer'
import Header from './header'
import { createServerComponentClient } from '../layout'

export default async function Layout({ children }: { children: React.ReactNode }) {
  const supabase = createServerComponentClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const { data: _profile } = await supabase
    .from('profiles')
    .select('full_name, avatar_url')
    .eq('profile_id', session?.user?.id)
    .single()

  const profile = _profile
    ? {
        avatar_url:
          _profile.avatar_url ??
          'https://www.reso.org/wp-content/uploads/2020/03/No-Photo-Available-591x591-2.jpg',
        full_name: _profile.full_name ?? '',
        email: session?.user?.email || '',
      }
    : null

  return (
    <>
      <Header profile={profile} />
      {children}
      <Footer />
    </>
  )
}
