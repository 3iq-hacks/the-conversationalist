'use client'

//import { useRouter } from 'next/router'
import { app, database } from '@/lib/firebase/config';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { Button } from 'flowbite-react';
import TextBar from '@/components/TextBar';
import { useState } from 'react';
 
//const dbInstance = collection(database, 'CHAT');

export default function Page({params}: {params: {id: string }}) {

  const [data, setData] = useState('');

  const childToParent = (childData) => {
    setData(childData.target.value)
    //console.log(childData.target.value)
  }
  //const router = useRouter()
  const saveNote = () => {
    const dbInstance = collection(database, params.id)
    addDoc(dbInstance, {
        textContent: data,
        textTime: Timestamp.now(),
        textAuthor: "user"
    }).then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        console.log('note saved')
    })
  }
  return (
    <div>
      <p>Post: {params.id}</p>
      <Button onClick={saveNote}>
        Save Note
      </Button>
      <TextBar childToParent={childToParent}></TextBar>
    </div>
  )
}