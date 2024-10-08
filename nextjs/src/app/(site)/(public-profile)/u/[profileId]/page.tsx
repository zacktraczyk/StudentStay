import PublicProfile from './public-profile'

// TODO: search by custom slug rather than profile_id
export default async function PublicProfilePage({
  params: { profileId },
}: {
  params: { profileId: string }
}) {
  // Created subcomponent to allow future route interception
  return (
    <div className='mx-auto max-w-7xl flex-col items-center justify-between gap-x-6 p-6 sm:px-8'>
      {/* @ts-expect-error Server Component */}
      <PublicProfile profile_id={profileId ?? ''} />
    </div>
  )
}
