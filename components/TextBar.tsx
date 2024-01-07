import { Autour_One } from "next/font/google"

export default function Component({ childToParent }: any) {
  return (
    <div style={{marginLeft: "auto"}}>
      <input
        type="text"
        name="textInput"
        onInput={i => childToParent(i)}
        style={{width: "80vw"}}
        className="h-full max-w-full bg-gray-50 h-auto border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      ></input>
    </div>
  )
}

// className="w-full max-w-none h-auto px-3 mb-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
