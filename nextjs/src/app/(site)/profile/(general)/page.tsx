import { createServerComponentClient } from '@/app/layout'
import ChangePassword from './change-password'
import DeleteAccount from './delete-account'
import PersonalInformation from './personal-information'
import Socials from './socials'
import Link from 'next/link'

export default async function General() {
  const supabase = createServerComponentClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const { data: profile } = await supabase
    .from('profiles')
    .select(
      'full_name, pronouns, avatar_url, instagram_profile, tictok_profile, snapchat_profile, facebook_profile',
    )
    .eq('profile_id', session?.user?.id)
    .maybeSingle()

  const profile_personal_information = {
    full_name: profile?.full_name || '',
    pronouns: profile?.pronouns || '',
    avatar_url: profile?.avatar_url || '',
  }

  const profile_socials = {
    instagram_profile: profile?.instagram_profile || '',
    tictok_profile: profile?.tictok_profile || '',
    snapchat_profile: profile?.snapchat_profile || '',
    facebook_profile: profile?.facebook_profile || '',
  }

  return (
    <>
      <div className='w-full pr-8 text-right'>
        <Link href={`/u/${session?.user?.id}`} className='text text-green-800 hover:text-green-700'>
          View Public Profile
        </Link>
      </div>
      <div className='-mt-4 divide-y divide-gray-300'>
        <PersonalInformation profile={profile_personal_information} />
        <Socials socials={profile_socials} />
        <ChangePassword />
        <DeleteAccount />
      </div>
    </>
  )
}
