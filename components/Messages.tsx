import { database } from '@/lib/firebase/config';
import { collection, Timestamp, query, onSnapshot, getDocs, orderBy } from 'firebase/firestore';

import { useState, useEffect } from 'react';
import TextBubble, { Props as TextBubbleProps } from '@/components/TextBubble'


export default function Component({ params }: { params: { id: string } }) {
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
          console.log(notesArray)
        })
      });
  }

  console.log('hello')

  useEffect(() => {
    getNotes();
  }, []);

  return <div className='flex flex-col space-y-3'>{notesArray.map((obj, i) => <TextBubble key={i} {...obj} />)}</div>
}