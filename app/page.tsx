'use client'

import HomepageCard from '@/components/HomepageCard'
import HomepageExtraCard from '@/components/HomepageExtraCard'
import { ReactNode } from 'react';
import { LayoutGroup, motion } from 'framer-motion';
import Sparkles from '@/components/Sparkle';
import { LandingAnimations } from '@/components/LandingAnimation';

const Motionize: React.FC<{ children: ReactNode }> = ({ children }) => {
  const min = -5;
  const max = 5;

  const randomInt = () => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-grow flex-col justify-center items-center"
    >
      <motion.button
        whileHover={{ scale: 1.05, rotate: randomInt() }}
        whileTap={{ scale: 0.9 }}
        className="flex flex-grow flex-col justify-center items-center"
      >
        <Sparkles>
          {children}
        </Sparkles>
      </motion.button>
    </motion.div>
  )
};

export default function Home() {


  return (
    <LayoutGroup>
      <audio controls autoPlay style={{ display: 'none' }}>
        <source src="/sounds/rizz.mp3" type="audio/mpeg" />
      </audio>

      <LandingAnimations>
        <main className="bg-white dark:bg-gray-800 flex-grow flex flex-grow flex-col">
          <div className="py-6 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Revive the dead</h1>
            <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">Or talk to anime girls. We don&apos;t discriminate.</p>
          </div>
          <div className='flex md:flex-row flex-col h-full md:justify-evenly md:space-y-0 space-y-8'>
            <Motionize>
              <HomepageCard
                linkTo='/new/trump'
                imgSrc='/imgs/trump.jpg'
                imgAlt='trump'
                title='Donald Trump'
                description='Tell him how you really think about him!' />
            </Motionize>
            <Motionize>
              <HomepageCard
                linkTo='/new/waifu'
                imgSrc='/imgs/anime.png'
                imgAlt='anime waifu (unknown)'
                title='Anime Waifu'
                description="You'll forget you're talking to an AI!" />
            </Motionize>
            <Motionize>
              <HomepageExtraCard />
            </Motionize>
          </div>
          <footer className="flex flex-col h-24 w-full items-center text-sm justify-center text-gray-900 dark:text-white dark:bg-slate-800 space-y-2 mt-auto">
            <p className="">Built by <a href="https://github.com/3iq-hacks" className="underline hover:bg-slate-200 dark:hover:bg-slate-600 py-0.5 rounded-sm">3IQ Hacks</a> for HackED 2024</p>
            <p className="">Code is available on <a href="https://github.com/3iq-hacks/hacked-2024" className="underline hover:bg-slate-200 dark:hover:bg-slate-600 py-0.5 rounded-sm">GitHub</a></p>
          </footer>
        </main>
      </LandingAnimations>
    </LayoutGroup>
  )
}
