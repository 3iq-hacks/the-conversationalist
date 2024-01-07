import { Card, Button, Badge } from 'flowbite-react'
import Image from 'next/image'

export default function Component() {
    return (
        <Card className="w-[350px] text-center">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Create your own!
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
                We can bring your deceased relatives back to (virtual) life!
            </p>
            <span className="flex flex-row justify-center">
                <Badge className="mr-2">Coming soon</Badge>
                <Image src="/imgs/kappa.png" width={20} height={20} alt="hehe" />
            </span>
        </Card>
    )
}

