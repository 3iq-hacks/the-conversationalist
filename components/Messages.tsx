import { database } from '@/lib/firebase/config';
import { collection, Timestamp, query, onSnapshot, getDocs } from 'firebase/firestore';

import { useState, useEffect } from 'react';
import TextBubble, {Props as TextBubbleProps } from '@/components/TextBubble'
import { set } from 'firebase/database';

var messages: any[];

// useEffect(() => {
//   unsubscribe();
// })

export default function Component({ params }: { params: { id: string } }) {
  const dbInstance = collection(database, 'chats/' + params.id + '/messages');

  //const [data, setData] = useState([] as any[]);

  //getDocs(q).then((docs) => {
  // const unsubscribe = onSnapshot(dbInstance, async () => {
  //   //setData([])
  //   console.log('meme')
  //   const q = query(dbInstance)
  //   //snapshot.docChanges().forEach((change) => {
  //       await getDocs(q).then((docs) => {
  //       console.log('happyno')
  //       docs.forEach((doc) => {
  //       //if(change.type === "added" || change.type === "modified") {
  //           console.log(doc.id, " => ", doc.data());
  //           console.log('happy')
  //           data.push(<TextBubble author={doc.data().textAuthor} description={doc.data().textContent} time={doc.data().textTime} />)
  //           //setData(messages)
  //           //console.log(messages.length)
  //           //unsubscribe()
  //   })
  // })},
  
  // (error) => {
  //   console.log(error)
  // });

  const [notesArray, setNotesArray] = useState<TextBubbleProps[]>([]);
 
  const getNotes = () => {
         getDocs(dbInstance)
             .then((docs: any) => {
              setNotesArray([]);
              docs.forEach((doc: any) => {
              
                //  setNotesArray(data.docs.map((item: any) => {
                //   console.log(item.data())
                //  })
                const data = doc.data();
                const newElem: TextBubbleProps = {author: data.textAuthor, description: data.textContent, time: data.textTime};
                setNotesArray(() => [...notesArray, newElem])
                console.log(data.textTime)
              })


                     //return { ...item.data(), id: item.id }
             });
             }
                 

  console.log('hello')


  useEffect(() => {
    const interval = setInterval(() => {
      setNotesArray([]);
      getNotes();
    }, 2000);
    return () => clearInterval(interval);
  });
  

  //unsubscribe();

  //return <div>{data}tn</div>
  return <p>{notesArray.map((obj, i) => <TextBubble key={i} {...obj} />)}</p>
}