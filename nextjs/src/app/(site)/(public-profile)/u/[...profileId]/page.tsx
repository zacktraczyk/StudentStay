import PublicProfile from './public-profile'

// TODO: search by custom slug rather than profile_id
export default async function PublicProfilePage({
  params: { profileId },
}: {
  params: { profileId: string }
}) {
  return (
    <div className='mx-auto max-w-7xl flex-col items-center justify-between gap-x-6 p-6 sm:px-8'>
      <PublicProfile profile_id={profileId ?? ''} />
    </div>
  )
}
