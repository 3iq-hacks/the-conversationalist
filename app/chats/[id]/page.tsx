'use client'

import { database } from '@/lib/firebase/config';
import { collection, Timestamp, query, onSnapshot, getDocs, orderBy, addDoc, doc, getDoc, limit } from 'firebase/firestore';
import TextStrip from '@/components/TextStrip'
import { useState, useEffect } from 'react';
import TextBubble, { Props as TextBubbleProps } from '@/components/TextBubble'
import TextBar from '@/components/TextBar';
import { Button } from 'flowbite-react';


var temp: any;

export default function Page({ params }: { params: { id: string } }) {
  const chatDocRef = doc(database, 'chats', params.id);
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
  const saveNote = async () => {
    const docRef = await addDoc(dbInstance, {
      textContent: textInput,
      textTime: Timestamp.now(),
      textAuthor: "user"
    })
    temp.value = '';

    console.log("Document written with ID: ", docRef.id);
    console.log('note saved');
    getNotes();

    // now, send a request to api/note.ts 
    // to generate a response

    const docSnap = await getDoc(chatDocRef);
    const currChatData = docSnap.data();
    console.log('currChatData: ', currChatData)
    if (!currChatData) {
      console.error('currChatData is null')
      return;
    }

    // get 5 most recent messages
    const messagesQuery = query(dbInstance, orderBy('textTime', 'desc'), limit(5));
    const messagesDocs = await getDocs(messagesQuery);
    const messagesArray: any[] = [];
    messagesDocs.forEach((doc) => {
      const data = doc.data();
      messagesArray.push({
        role: data.textAuthor,
        content: data.textContent
      });
    })
    const response = await fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: currChatData.model,
        initialPrompt: currChatData.initialPrompt,
        messages: messagesArray
      })
    });
    // get response body
    const responseJson = await response.json();
    console.log('responseJson: ', responseJson);

    // save responseJson to firebase 
    // it is of the form { role, content }
    const responseDocRef = await addDoc(dbInstance, {
      textContent: responseJson.content,
      textTime: Timestamp.now(),
      textAuthor: responseJson.role
    })
    console.log('responseDocRef: ', responseDocRef)
    getNotes();
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