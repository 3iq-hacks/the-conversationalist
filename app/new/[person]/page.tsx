'use client'

import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { app, database } from '@/lib/firebase/config';
import { use, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// VERY BAD PROGRAMMING 
// WOOOOOOOOOOOOOOO
const getGPTModel = (name: string) => {
    if (name == 'trump') {
        return 'ft:gpt-3.5-turbo-0613:personal:hacked2024-trump:8eCnI7PH'
    } else {
        // only other option is waifu
        return 'ft:gpt-3.5-turbo-0613:personal:hacked2024-waifu:8eEqNOXU'
    }
}

const getInitialPrompt = (name: string) => {
    if (name == 'trump') {
        return 'You are pretending to be Trump, and it is terrifyingly scary.'
    } else {
        return 'You are an Anime Waifu, you are obsessed and in love with the computer science student.'
    }
}

export default function Page({ params }: { params: { person: string } }) {
    const router = useRouter();

    useEffect(() => {
        async function createCollection() {
            try {
                console.log('Creating new collection')

                // create a new firebase collection inside /chats
                // and redirect to /chats/:id
                const chats = collection(database, 'chats');
                console.log('Got chats collection: ', chats)
                const chatDocRef = await addDoc(chats, {
                    createdAt: Timestamp.now(),
                    model: getGPTModel(params.person),
                });
                console.log('Created new chat document: ', chatDocRef.id)
                // add a collection into charDocRef. This is the messages into the chat
                const messagesCollection = collection(chatDocRef, 'messages');
                const messagesDocRef = await addDoc(messagesCollection, {
                    textTime: Timestamp.now(),
                    textContent: getInitialPrompt(params.person),
                    textAuthor: 'server'
                });
                console.log('Created new message document: ', messagesDocRef.id)

                // redirect to /chats/:id
                console.log(`Redirecting to /chats/${chatDocRef.id}`)
                router.replace(`/chats/${chatDocRef.id}`);
            } catch (e) {
                console.error('Error creating new collection: ', e);
            }
        }

        createCollection();

    }, []);

    return (
        <div>
            <h1>Loading :3</h1>
        </div>
    )
}