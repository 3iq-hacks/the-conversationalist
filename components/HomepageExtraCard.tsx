import { Card, Button, Badge } from 'flowbite-react'
import Image from 'next/image'
import Sparkles from './Sparkle'

export default function Component() {
    return (
        <Card className="w-[350px] text-center">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Create your own!
            </h5>
            <span className="flex flex-row justify-center">
                <Badge className="ml-2">Coming soon!!</Badge>
                <Image src="/imgs/kappa.png" width={20} height={20} alt="hehe" />
            </span>
        </Card>
    )
}

