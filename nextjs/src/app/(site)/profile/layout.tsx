import ProfileNavbar from './profile-navbar'

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='mx-auto max-w-7xl lg:flex lg:gap-x-16 lg:px-8'>
      <ProfileNavbar />
      <div className='px-3 py-4'>{children}</div>
    </div>
  )
}
