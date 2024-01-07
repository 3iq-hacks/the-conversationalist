'use client'

import { app, database } from '@/lib/firebase/config';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
//import { Button } from 'flowbite-react';
//import TextBar from '@/components/TextBar';
import { useState } from 'react';
import TextStrip from '@/components/TextStrip'
import Messages from '@/components/Messages'

//const dbInstance = collection(database, 'CHAT');

export default function Page({ params }: { params: { id: string } }) {  
  
  return (
    <div className="grid">
      <div style={{width: "100vw", marginBottom: "50px", maxHeight: "80vh", overflowY: "scroll"}}>
        <Messages params={params} />
      </div>
      <div className="fixed bottom-3" style={{width: "100vw", height: "50px"}}>
        <TextStrip params={params} />
      </div>
    </div>
  )
}  

/*
<Button onClick={saveNote}>
        Save Note
      </Button>
      <TextBar childToParent={childToParent}></TextBar>
      */