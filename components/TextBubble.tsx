import { Timestamp } from "firebase/firestore";
import { Button } from "flowbite-react";

export interface Props {
   author: string
   description: string
   time: Timestamp
}

function datify(time: Timestamp) {
   const date = new Date(time.seconds * 1000)
   return date.toLocaleTimeString()
}

export default function Component(props: Props) {
   const extraClass = props.author == "user" ? "justify-end" : "justify-start"
   return (
      <div className={`flex items-start gap-2.5 w-full ${extraClass} `}>
         <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
            <div className="flex items-center space-x-2 rtl:space-x-reverse" >
               <span className="text-sm font-semibold text-gray-900 dark:text-white">{props.author}</span>
               <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{datify(props.time)}</span>
            </div>
            <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">{props.description}</p>
         </div>
      </div>
   )
}
