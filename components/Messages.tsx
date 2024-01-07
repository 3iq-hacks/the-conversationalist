'use client'

import { database } from '@/lib/firebase/config';
import { collection, Timestamp, query, onSnapshot, getDocs } from 'firebase/firestore';

import { useState } from 'react';
import TextBubble from '@/components/TextBubble'

var messages: any[];

export default function Component({ params }: { params: { id: string } }) {
  const dbInstance = collection(database, 'chats/' + params.id + '/messages');

  const [data, setData] = useState([] as any[]);

  //getDocs(q).then((docs) => {
  const unsubscribe = onSnapshot(dbInstance, () => {
    //setData([])
    console.log('meme')
    const q = query(dbInstance)
    //snapshot.docChanges().forEach((change) => {
        getDocs(q).then((docs) => {
        console.log('happyno')
        docs.forEach((doc) => {
        //if(change.type === "added" || change.type === "modified") {
            console.log(doc.id, " => ", doc.data());
            console.log('happy')
            data.push(<TextBubble author={doc.data().textAuthor} description={doc.data().textContent} time={doc.data().textTime} />)
            //setData(messages)
            //console.log(messages.length)
    })
  })},
  
  (error) => {
    console.log(error)
  });


  unsubscribe();

  return <div>{data}tn</div>
}