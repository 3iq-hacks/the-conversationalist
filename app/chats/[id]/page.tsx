'use client'

import { database } from '@/lib/firebase/config';
import { collection, Timestamp, query, onSnapshot, getDocs, orderBy, addDoc, doc, getDoc, limit } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import TextBubble, { Props as TextBubbleProps } from '@/components/TextBubble'
import { Button } from 'flowbite-react';
import Head from 'next/head';


var temp: any;

export default function Page({ params }: { params: { id: string } }) {
  const chatDocRef = doc(database, 'chats', params.id);
  const dbInstance = collection(database, 'chats/' + params.id + '/messages');

  const [notesArray, setNotesArray] = useState<TextBubbleProps[]>([]);
  const [chatInfo, setChatInfo] = useState<any>(null);

  const getNotes = () => {
    getDocs(query(dbInstance, orderBy('textTime', 'asc')))
      .then(docs => {
        setNotesArray([]);
        console.log('Docs has ' + docs.size + ' elements')
        docs.forEach((doc: any) => {
          const data = doc.data();
          const newElem: TextBubbleProps = { author: data.textAuthor, description: data.textContent, time: data.textTime, model: 'unknown' };
          setNotesArray(arr => [...arr, newElem]);
        })
        // set scroll to bottom of #scroll-container
        // but after a delay of 250ms
        // so that the messages have time to load
        setTimeout(() => {
          const scrollContainer = document.getElementById('scroll-container');
          if (scrollContainer) {
            scrollContainer.scrollIntoView(false);
          }
        }, 250);
      })
  }

  useEffect(() => {
    getDoc(chatDocRef).then((docSnap) => {
      const chatData = docSnap.data();
      setChatInfo(chatData);
    })
    getNotes();
  }, []);

  /// TEXT INPUT
  const [textInput, setTextInput] = useState('');

  const handleKeydown = (e: any) => {
    if (e.key === 'Enter') {
      saveNote();
    }
  }

  const onInput = (childData: any) => {
    setTextInput(childData.target.value)
    temp = childData.target
  }
  //const router = useRouter()
  const saveNote = async () => {
    if (textInput === '') {
      return;
    }

    const docRef = await addDoc(dbInstance, {
      textContent: textInput,
      textTime: Timestamp.now(),
      textAuthor: "user"
    })
    temp.value = '';

    setTextInput('');

    console.log("Document written with ID: ", docRef.id);
    console.log('note saved');
    getNotes();

    // now, send a request to api/note.ts 
    // to generate a response

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
    // reverse messagesArray so that it is in chronological order
    messagesArray.reverse();
    const response = await fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: chatInfo.model,
        initialPrompt: chatInfo.initialPrompt,
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
      <Head>
        <title>Chat with {chatInfo ? chatInfo.person : 'Loading...'} - The Conversationalist</title>
      </Head>
      <h1 className="w-full text-center text-2xl p-2">
        {chatInfo ? `Talking to ${chatInfo.person}` : 'Loading...'}
      </h1>
      <div style={{ width: "100vw", marginBottom: "50px", maxHeight: "80vh", overflowY: "scroll" }}>
        <div className='flex flex-col space-y-3' id='scroll-container'>
          {notesArray.map((obj, i) => <TextBubble key={i} model={chatInfo.model} author={obj.author} description={obj.description} time={obj.time} />)}
        </div>
      </div>
      <div className="flex fixed bottom-3 flex-row justify-center space-x-4 w-full">
        <input
          type="text"
          name="textInput"
          onInput={onInput}
          onKeyDown={handleKeydown}
          className="h-full w-3/4 bg-gray-50 h-auto border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <Button
          pill
          className="flex flex-wrap"
          onClick={saveNote}>
          Send
        </Button>
      </div>
    </div>
  )
}