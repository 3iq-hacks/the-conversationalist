import { useRouter } from 'next/router'
import { app, database } from '../../app/firebase/config';
import { collection, addDoc } from 'firebase/firestore';

const dbInstance = collection(database, 'notes');
 
export default function Page() {
  const router = useRouter()
  const saveNote = () => {
    addDoc(dbInstance, {
        noteTitle: "moon",
        noteDesc: "world"
    }).then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        console.log('note saved')
    })
  }
  saveNote()
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