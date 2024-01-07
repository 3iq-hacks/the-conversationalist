'use client'

import Image from 'next/image'

interface Props {
    imgSrc: string
    imgAlt: string
    title: string
    description: string
}

export default function Component(props: Props) {
    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-center">
            <Image src={props.imgSrc} width={350} height={350} alt={props.imgAlt} objectFit='contain' objectPosition='top' />
            <div className="p-5 flex flex-col">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {props.title}
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    {props.description}
                </p>
                <a href="#" className="inline-flex items-center justify-center p-5 text-base font-medium text-blue-600 dark:text-blue-500">
                    <span className="mr-3">Start a conversation</span>
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path
                            fillRule="evenodd"
                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </a>
            </div>
        </div>
    )
}