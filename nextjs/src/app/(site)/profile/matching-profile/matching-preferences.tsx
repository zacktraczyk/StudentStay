import { useSupabase } from '@/app/supabase-provider'
import { Database } from '@/lib/database.types'
import { useState } from 'react'

type sliderDescriptions = [string, string, string, string, string]

const matchingPreferencesDescriptions = {
  sleepingHabits: {
    inputName: 'Usual Bedtime',
    inputDescription: 'When do you usually go to bed?',
    sliderDescriptions: [
      'Earlier than 8pm',
      '8pm - 10pm',
      '10pm - 12am',
      '12am - 2am',
      'Later than 2am',
    ] as sliderDescriptions,
  },
  noiseSensitivity: {
    inputName: 'Noise Sensitivity',
    inputDescription:
      'What would you like the noise level to be at home? Are you comfortable with loud music or do you prefer a quiet environment?',
  },

  personalCleanliness: {
    inputName: 'Personal Cleanliness',
    inputDescription:
      'How clean do you keep your personal space? Do you keep things neat or are you comfortable with a little mess?',
  },
  cleanlinessPreference: {
    inputName: 'Cleanliness Preference',
    inputDescription:
      'How clean do you expect your roommates to keep the common areas? Are you comfortable with a little mess or do you prefer to keep things tidy?',
  },
  homeSocialInclination: {
    inputName: 'Home Social Inclination',
    inputDescription:
      'How often do you like to hang out with your roommates? How often do you like to have friends over?',
  },

  socialBattery: {
    inputName: 'Social Battery',
    inputDescription:
      'How often do you like your roomates to have people over? Do you like things quiet or are you okey with parties at home?',
  },

  smokingPreference: {
    inputName: 'Smoking Preference',
    inputDescription: 'Do you smoke? Are you comfortable with smoking at home?',
  },

  drinkingPreference: {
    inputName: 'Drinking Preference',
    inputDescription: 'Do you drink? Are you comfortable with drinking at home?',
  },

  dogPreference: {
    inputName: 'Dog Preference',
    inputDescription: 'Do you like dogs? Are you comfortable with dogs at home?',
  },

  catPreference: {
    inputName: 'Cat Preference',
    inputDescription: 'Do you like cats? Are you comfortable with cats at home?',
  },
}

interface MatchingPreferencesProps {
  initialPreferences: Database['public']['Tables']['housing_preferences']['Row'] | null
}

export default function MatchingPreferences({ initialPreferences }: MatchingPreferencesProps) {
  const { supabase, session } = useSupabase()

  const [sleepingHabits, setSleepingHabits] = useState(
    (initialPreferences && initialPreferences.sleeping_habits) || 3,
  )
  const [noiseSensitivity, setNoiseSensitivity] = useState(
    (initialPreferences && initialPreferences.noise_sensitivity) || 3,
  )

  const [personalCleanliness, setPersonalCleanliness] = useState(
    (initialPreferences && initialPreferences.personal_cleanliness) || 3,
  )
  const [cleanlinessPreference, setCleanlinessPreference] = useState(
    (initialPreferences && initialPreferences.cleanliness_preference) || 3,
  )

  const [homeSocialInclination, setHomeSocialInclination] = useState(
    (initialPreferences && initialPreferences.home_social_inclination) || 3,
  )
  const [socialBattery, setSocialBattery] = useState(
    (initialPreferences && initialPreferences.social_battery) || 3,
  )

  const [smokingPreference, setSmokingPreference] = useState(
    (initialPreferences && initialPreferences.smoking_preference) || 3,
  )
  const [drinkingPreference, setDrinkingPreference] = useState(
    (initialPreferences && initialPreferences.alcohol_preference) || 3,
  )

  const [dogPreference, setDogPreference] = useState(
    (initialPreferences && initialPreferences.dog_preference) || 3,
  )
  const [catPreference, setCatPreference] = useState(
    (initialPreferences && initialPreferences.cat_preference) || 3,
  )

  const handlePreferencesUpdate = async () => {
    console.log('update preferences for user: ', session!.user.id)

    const { error } = await supabase
      .from('housing_preferences')
      .update({
        sleeping_habits: sleepingHabits,
        noise_sensitivity: noiseSensitivity,
        personal_cleanliness: personalCleanliness,
        cleanliness_preference: cleanlinessPreference,
        home_social_inclination: homeSocialInclination,
        social_battery: socialBattery,
        smoking_preference: smokingPreference,
        alcohol_preference: drinkingPreference,
        dog_preference: dogPreference,
        cat_preference: catPreference,
      })
      .eq('profile_id', session!.user.id)
      .single()

    if (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <Slider
        {...matchingPreferencesDescriptions.sleepingHabits}
        sliderValue={sleepingHabits}
        setSliderValue={setSleepingHabits}
      />

      <Slider
        {...matchingPreferencesDescriptions.noiseSensitivity}
        sliderValue={noiseSensitivity}
        setSliderValue={setNoiseSensitivity}
      />

      <Slider
        {...matchingPreferencesDescriptions.personalCleanliness}
        sliderValue={personalCleanliness}
        setSliderValue={setPersonalCleanliness}
      />

      <Slider
        {...matchingPreferencesDescriptions.cleanlinessPreference}
        sliderValue={cleanlinessPreference}
        setSliderValue={setCleanlinessPreference}
      />

      <Slider
        {...matchingPreferencesDescriptions.homeSocialInclination}
        sliderValue={homeSocialInclination}
        setSliderValue={setHomeSocialInclination}
      />

      <Slider
        {...matchingPreferencesDescriptions.socialBattery}
        sliderValue={socialBattery}
        setSliderValue={setSocialBattery}
      />

      <Slider
        {...matchingPreferencesDescriptions.smokingPreference}
        sliderValue={smokingPreference}
        setSliderValue={setSmokingPreference}
      />

      <Slider
        {...matchingPreferencesDescriptions.drinkingPreference}
        sliderValue={drinkingPreference}
        setSliderValue={setDrinkingPreference}
      />

      <Slider
        {...matchingPreferencesDescriptions.dogPreference}
        sliderValue={dogPreference}
        setSliderValue={setDogPreference}
      />

      <Slider
        {...matchingPreferencesDescriptions.catPreference}
        sliderValue={catPreference}
        setSliderValue={setCatPreference}
      />

      <div className='mt-8 flex'>
        <button
          type='submit'
          className='rounded-md bg-green-800 px-10 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500'
          onClick={handlePreferencesUpdate}
        >
          Save
        </button>
      </div>
    </div>
  )
}

interface SliderProps {
  inputName: string
  inputDescription: string
  sliderDescriptions?: sliderDescriptions
  sliderValue: number
  setSliderValue: React.Dispatch<React.SetStateAction<number>>
}

function Slider(props: SliderProps) {
  const { inputName, inputDescription, sliderValue, setSliderValue } = props
  const sliderDescriptions = props.sliderDescriptions || ['1', '2', '3', '4', '5']

  return (
    <div className='flex w-full flex-col space-y-2 py-10'>
      <h4 className='text-sm font-semibold leading-6 text-gray-900'>{inputName}</h4>
      <p className='mt-1 pb-8 text-sm leading-6 text-gray-600'>{inputDescription}</p>

      <input
        type='range'
        className='h-1 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-green-800 active:accent-green-900'
        min='1'
        max='5'
        value={sliderValue}
        onChange={(e) => setSliderValue(e.target.valueAsNumber)}
        step='1'
      />
      <ul className='flex w-full justify-between px-[10px] text-xs'>
        <li className='relative flex justify-center'>
          <span className='absolute'>{sliderDescriptions[0]}</span>
        </li>
        <li className='relative flex justify-center'>
          <span className='absolute'>{sliderDescriptions[1]}</span>
        </li>
        <li className='relative flex justify-center'>
          <span className='absolute'>{sliderDescriptions[2]}</span>
        </li>
        <li className='relative flex justify-center'>
          <span className='absolute'>{sliderDescriptions[3]}</span>
        </li>
        <li className='relative flex justify-center'>
          <span className='absolute'>{sliderDescriptions[4]}</span>
        </li>
      </ul>
    </div>
  )
}
