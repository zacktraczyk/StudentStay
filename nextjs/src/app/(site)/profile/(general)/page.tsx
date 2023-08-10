import { createServerComponentClient } from '@/app/layout'
import ChangePassword from './change-password'
import DeleteAccount from './delete-account'
import PersonalInformation from './personal-information'

export default async function General() {
  const supabase = createServerComponentClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, avatar_url')
    .eq('profile_id', session?.user?.id)
    .maybeSingle()

  return (
    <div className='divide-y divide-gray-300'>
      <PersonalInformation profile={profile} />
      <ChangePassword />
      <DeleteAccount />
    </div>
  )
}
