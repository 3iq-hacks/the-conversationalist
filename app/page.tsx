import Image from 'next/image'
import { Card, Button, Badge } from 'flowbite-react'
import HomepageCard from '@/components/HomepageCard'

export default function Home() {
  return (
    <main className="bg-white dark:bg-gray-800 min-h-screen flex flex-col">
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Revive the dead</h1>
        <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">Or talk to anime girls. We don&apos;t discriminate.</p>
      </div>
      <div className='flex flex-row h-full justify-evenly'>
        <HomepageCard imgSrc='/imgs/trump.jpg' imgAlt='trump' title='Donald Trump' description='Tell him how you really think about him!' />
        <HomepageCard imgSrc='/imgs/cat.jpg' imgAlt='anime catgirl' title='Anime Catgirl' description="You'll forget you're talking to an AI!" />
        <Card className="w-[350px] text-center">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Create your own!
          </h5>
          <span className="flex flex-row justify-center">
            <Badge className="ml-2">Coming soon!!</Badge>
            <Image src="/imgs/kappa.png" width={20} height={20} alt="hehe" />
          </span>
        </Card>
      </div>
    </main>
  )
}
