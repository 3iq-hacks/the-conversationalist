import { useRouter } from 'next/router'
import { app, database } from '../../app/firebase/config';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
 
//const dbInstance = collection(database, 'CHAT');

export default function Page() {
  const router = useRouter()
  const saveNote = () => {
    const dbInstance = collection(database, router.query.id)
    addDoc(dbInstance, {
        noteTitle: "moon",
        noteDesc: "world",
        noteTime: Timestamp.now()
    }).then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        console.log('note saved')
    })
  }
  console.log('hello')
  return (
    <div>
      <p>Post: {router.query.id}</p>
      <button onClick={saveNote}>
        Save Note
      </button>
    </div>
  )
}