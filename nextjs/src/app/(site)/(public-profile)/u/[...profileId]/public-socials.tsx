interface SocialsProps {
  instagram_profile: string
  tictok_profile: string
  snapchat_profile: string
  facebook_profile: string
}

export default function PublicSocials({ socials }: { socials: SocialsProps }) {
  console.log('socials:', socials)
  const { instagram_profile, tictok_profile, snapchat_profile, facebook_profile } = socials
  return (
    <div className='py-8'>
      <h1 className='text-lg font-bold'>Socials</h1>
      {instagram_profile && <p>Insta: @{instagram_profile}</p>}
      {tictok_profile && <p>TicTok: @{tictok_profile}</p>}
      {snapchat_profile && <p>Snap: @{snapchat_profile}</p>}
      {facebook_profile && <p>Facebook: @{facebook_profile}</p>}
    </div>
  )
}
