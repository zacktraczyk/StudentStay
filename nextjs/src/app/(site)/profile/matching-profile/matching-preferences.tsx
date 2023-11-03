import { useSupabase } from '@/app/supabase-provider'
import { Database } from '@/lib/database.types'
import { classNames } from '@/lib/string'
import { MoonIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

type HeroIcon = (props: React.ComponentProps<'svg'>) => JSX.Element
type sliderDescriptions = [string, string, string, string, string]

const matchingPreferencesDescriptions = {
  sleepingHabits: {
    inputName: 'Usual Bedtime',
    inputIcon: MoonIcon,
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
    sliderDescriptions: [
      'I like it near silent',
      'I like a calm enviroment',
      'I like some noise',
      'I do not mind if it is loud',
      'I like it very loud',
    ] as sliderDescriptions,
  },

  personalCleanliness: {
    inputName: 'Personal Cleanliness',
    inputDescription:
      'How clean do you keep your personal space? Do you keep things neat or are you comfortable with a little mess?',
    sliderDescriptions: [
      'I rarely clean up',
      'I clean up once a week',
      'I clean up when things are too mesy',
      'I clean up every day',
      'I almost never leave a mess',
    ] as sliderDescriptions,
  },
  cleanlinessPreference: {
    inputName: 'Cleanliness Preference',
    inputDescription:
      'How clean do you expect your roommates to keep the common areas? Are you comfortable with a little mess or do you prefer to keep things tidy?',
    sliderDescriptions: [
      'I am fine with a pigsty',
      'I do not mind it being messy most of the time',
      'I am fine with the occasional mess',
      'I like things to be clean most of the time',
      'I never want to see an uncleaned mess',
    ] as sliderDescriptions,
  },
  homeSocialInclination: {
    inputName: 'Home Social Inclination',
    inputDescription:
      'How often do you like to hang out with your roommates? How often do you like to have friends over?',
    sliderDescriptions: [
      'I like to be alone most of the time',
      'I like to hang out with my roommates sometimes',
      'I have friends over sometimes',
      'I often have friends over',
      "I don't like the party to stop",
    ] as sliderDescriptions,
  },
  socialBattery: {
    inputName: 'Social Battery',
    inputDescription:
      'How often do you like your roomates to have people over? Do you like things quiet or are you okey with parties at home?',
    sliderDescriptions: [
      'I never want to see anyone else',
      'I like to have my own space most of the time',
      'I am fine with guests sometimes',
      'I like when people come over',
      'I am fine with having people over all the time',
    ] as sliderDescriptions,
  },
  smokingPreference: {
    inputName: 'Smoking Preference',
    inputDescription: 'Do you smoke? Are you comfortable with smoking at home?',
    sliderDescriptions: [
      'I cannot stand smoking',
      'I do not mind if you smoke outside',
      'I do not mind either way',
      'I smoke on occasion',
      'I smoke regularly',
    ] as sliderDescriptions,
  },
  drinkingPreference: {
    inputName: 'Drinking Preference',
    inputDescription: 'Do you drink? Are you comfortable with drinking at home?',
    sliderDescriptions: [
      'I am not comfortable with my roommates drinking',
      'I do not mind if you drink not at home',
      'I do not mind either way',
      'I drink on occasion',
      'I drink regularly',
    ] as sliderDescriptions,
  },
  dogPreference: {
    inputName: 'Dog Preference',
    inputDescription: 'Do you like dogs? Are you comfortable with dogs at home?',
    sliderDescriptions: [
      'I cannot be around dogs',
      'I do not mind if you have a dog',
      'I like dogs',
      'I plan on having a dog',
      'I have a dog',
    ] as sliderDescriptions,
  },
  catPreference: {
    inputName: 'Cat Preference',
    inputDescription: 'Do you like cats? Are you comfortable with cats at home?',
    sliderDescriptions: [
      'I cannot be around cats',
      'I do not mind if you have a cat',
      'I like cats',
      'I plan on having a cat',
      'I have a cat',
    ] as sliderDescriptions,
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
    <div className='divide-y divide-gray-300'>
      <div>
        <div className='pb-8'>
          <h2 className='text-base font-semibold leading-7 text-gray-900'>Your Lifestyle</h2>
          <p className='mt-1 text-sm leading-6 text-gray-400'>How you prefer to live at home.</p>
        </div>

        <Slider
          {...matchingPreferencesDescriptions.sleepingHabits}
          sliderValue={sleepingHabits}
          setSliderValue={setSleepingHabits}
        />

        <Slider
          {...matchingPreferencesDescriptions.personalCleanliness}
          sliderValue={personalCleanliness}
          setSliderValue={setPersonalCleanliness}
        />

        <Slider
          {...matchingPreferencesDescriptions.homeSocialInclination}
          sliderValue={homeSocialInclination}
          setSliderValue={setHomeSocialInclination}
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
      </div>

      <div>
        <div className='py-8'>
          <h2 className='text-base font-semibold leading-7 text-gray-900'>Your Comfort Zone</h2>
          <p className='mt-1 text-sm leading-6 text-gray-400'>
            What you are comfortable with at home.
          </p>
        </div>

        <Slider
          {...matchingPreferencesDescriptions.noiseSensitivity}
          sliderValue={noiseSensitivity}
          setSliderValue={setNoiseSensitivity}
        />

        <Slider
          {...matchingPreferencesDescriptions.cleanlinessPreference}
          sliderValue={cleanlinessPreference}
          setSliderValue={setCleanlinessPreference}
        />

        <Slider
          {...matchingPreferencesDescriptions.socialBattery}
          sliderValue={socialBattery}
          setSliderValue={setSocialBattery}
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
      </div>

      <div className='mt-6 flex items-center justify-end gap-x-6 pt-6'>
        <button type='button' className='text-sm font-semibold leading-6 text-gray-900'>
          Cancel
        </button>
        <button
          type='submit'
          className='rounded-md bg-green-800 px-10 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800'
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
  InputIcon?: HeroIcon
  inputDescription: string
  sliderDescriptions?: sliderDescriptions
  sliderValue: number
  setSliderValue: React.Dispatch<React.SetStateAction<number>>
}

function Slider(props: SliderProps) {
  const { inputName, InputIcon, inputDescription, sliderValue, setSliderValue } = props
  const sliderDescriptions = props.sliderDescriptions || ['1', '2', '3', '4', '5']

  return (
    <div className='flex w-full flex-col space-y-2 py-20'>
      <div className='flext'>
        {InputIcon && (
          <div className='mr-4 shrink-0'>
            <InputIcon className='w-20' />
          </div>
        )}
        <div>
          <h4 className='text-sm font-semibold leading-6 text-gray-900'>{inputName}</h4>
          <p className='mt-1 pb-8 text-sm leading-6 text-gray-400'>{inputDescription}</p>
        </div>
      </div>

      <input
        type='range'
        className='h-1 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-green-800 active:accent-green-900'
        min='1'
        max='5'
        value={sliderValue}
        onChange={(e) => setSliderValue(e.target.valueAsNumber)}
        step='1'
      />
      <ul className='grid w-full grid-cols-5 justify-between gap-5 text-xs'>
        {sliderDescriptions.map((description, index) => (
          <li
            className={classNames(
              sliderValue == index + 1 ? 'text-black' : 'text-gray-400',
              index < 5 / 2 - 1 && 'justify-start',
              index > 5 / 2 && 'justify-end',
              index == Math.floor(5 / 2) && 'justify-center',
              'relative flex',
            )}
            key={index}
          >
            {description}
          </li>
        ))}
      </ul>
    </div>
  )
}
