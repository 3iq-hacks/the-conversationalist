'use client'

import { database } from '@/lib/firebase/config';
import { collection, Timestamp, query, onSnapshot, getDocs, orderBy, addDoc, doc } from 'firebase/firestore';
import TextStrip from '@/components/TextStrip'
import { useState, useEffect } from 'react';
import TextBubble, { Props as TextBubbleProps } from '@/components/TextBubble'
import TextBar from '@/components/TextBar';
import { Button } from 'flowbite-react';


var temp: any;

export default function Page({ params }: { params: { id: string } }) {
  const dbInstance = collection(database, 'chats/' + params.id + '/messages');

  const [notesArray, setNotesArray] = useState<TextBubbleProps[]>([]);

  const getNotes = () => {
    getDocs(query(dbInstance, orderBy('textTime', 'asc')))
      .then((docs) => {
        setNotesArray([]);
        console.log('Docs has ' + docs.size + ' elements')
        docs.forEach((doc: any) => {
          const data = doc.data();
          const newElem: TextBubbleProps = { author: data.textAuthor, description: data.textContent, time: data.textTime };
          setNotesArray(arr => [...arr, newElem]);
        })
      });
  }

  console.log('hello')

  useEffect(() => {
    getNotes();
  }, []);

  /// TEXT INPUT
  const [textInput, setTextInput] = useState('');

  const childToParent = (childData: any) => {
    setTextInput(childData.target.value)
    temp = childData.target
  }
  //const router = useRouter()
  const saveNote = () => {
    addDoc(dbInstance, {
      textContent: textInput,
      textTime: Timestamp.now(),
      textAuthor: "user"
    })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        console.log('note saved')
        temp.value = '';
      })
      .finally(() => {
        getNotes();
      })
  }

  return (
    <div className="grid">
      <div style={{ width: "100vw", marginBottom: "50px", maxHeight: "80vh", overflowY: "scroll" }}>
        <div className='flex flex-col space-y-3'>
          {notesArray.map((obj, i) => <TextBubble key={i} {...obj} />)}
        </div>
      </div>
      <div className="fixed bottom-3" style={{ width: "100vw", height: "50px" }}>
        <div className="flex max-w-full" style={{ width: "100vw" }}>
          <TextBar childToParent={childToParent}></TextBar>
          <Button
            pill
            className="max-w-sm flex flex-wrap"
            style={{ marginRight: "auto" }}
            onClick={saveNote}>
            Send
          </Button>
        </div>
      </div>
    </div>
  )
}