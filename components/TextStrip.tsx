'use client'

import { app, database } from '@/lib/firebase/config';
import { collection, addDoc, Timestamp, documentId, DocumentReference, doc } from 'firebase/firestore';
import { Button } from 'flowbite-react';
import TextBar from '@/components/TextBar';
import { useState } from 'react';

const dbInstance = collection(database, 'chats');
var temp: any;

export default function Component({ params }: { params: { id: string } }) {

  const [data, setData] = useState('');

  const childToParent = (childData: any) => {
    setData(childData.target.value)
    temp = childData.target
  }
  //const router = useRouter()
  const saveNote = () => {
    //const dbInstance = collection(database, params.id)

    const docRef = doc(dbInstance, params.id)
    const collectionRef = collection(docRef, 'messages')
    //.collection('messages')
    addDoc(collectionRef, {
      textContent: data,
      textTime: Timestamp.now(),
      textAuthor: "user"
    })
    /*addDoc(dbInstance, {
      textContent: data,
      textTime: Timestamp.now(),
      textAuthor: "user"
    })*/
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
      console.log('note saved')
      temp.value = '';
    })
  }
  return (
    <div className="flex max-w-full" style={{width: "100vw"}}>
      <TextBar childToParent={childToParent}></TextBar>
      <Button
        pill
        className="max-w-sm flex flex-wrap"
        style={{marginRight: "auto"}}
        onClick={saveNote}>
        Save Note
      </Button>
    </div>
  )
}