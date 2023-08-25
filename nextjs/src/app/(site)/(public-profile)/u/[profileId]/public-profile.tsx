import PublicProfileHeader from './public-profile-header'
import { createServerComponentClient } from '@/app/layout'
import PublicSocials from './public-socials'

export default async function PublicProfile({ profile_id }: { profile_id: string }) {
  const supabase = createServerComponentClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const { data: profile, error } = await supabase
    .from('profiles')
    .select(
      'full_name, pronouns, avatar_url, instagram_profile, tictok_profile, snapchat_profile, facebook_profile',
    )
    .eq('profile_id', profile_id)
    .maybeSingle()

  if (error) {
    throw error
  }

  const profile_personal_information = {
    full_name: profile?.full_name || '',
    pronouns: profile?.pronouns || '',
    avatar_url: profile?.avatar_url || '',
    email: session?.user?.email || '',
  }

  const profile_socials = {
    instagram_profile: profile?.instagram_profile || '',
    tictok_profile: profile?.tictok_profile || '',
    snapchat_profile: profile?.snapchat_profile || '',
    facebook_profile: profile?.facebook_profile || '',
  }

  return (
    <div>
      <PublicProfileHeader profile={profile_personal_information} />
      <PublicSocials socials={profile_socials} />
    </div>
  )
}
