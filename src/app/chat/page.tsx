"use client";

import { useActions, useAIState, useUIState } from "ai/rsc";
import { ClientMessage } from "./ia-actions";
import { useState } from "react";
import { generateId } from "ai";


export default function ChatPage() {

    const [ messages, setMessages ] = useAIState();
    const [input, setInput] = useState<string>('');
    const [conversation, setConversation] = useUIState();
    const { submitUserMessage } = useActions();

    return (
        // <div className="bg-neutral-800/20 rounded-lg w-full border-8 border-neutral-800/20 p-4">
        // <div className="rounded-xl bg-slate-50/40 p-1.5 ring-1 ring-inset ring-slate-200/50 w-full">     
        // </div>

        <div 
            className="rounded-xl w-full"
        >
            <div className="z-10 rounded-xl bg-neutral-900/40 p-1.5 ring-1 ring-inset ring-neutral-700/10 size-full">
                <div className="flex justify-center overflow-hidden rounded-md bg-neutral-900 p-6 ring-1 ring-neutral-600/5 size-full">
                    <div className="w-full flex-1 flex justify-between flex-col">
                        <div className="flex flex-col">
                            <div className="h-8 border-b border-neutral-700/20">
                                title
                            </div>
                            <div>

                            </div>
                        </div>
                        <div className="max-w-[700px]">
                            2
                        </div>
                    </div>
                </div>
            </div>
        </div>
    //     <div>
    //         <h1>Chat</h1>
    //         <ul>
    //             { conversation.map((message: ClientMessage) => (
    //                 <div key={message.id}>
    //                     {message.role}: {message.display}
    //                 </div>
    //             ))}
    //         </ul>
    //         <input
    //       type="text"
    //       value={input}
    //       onChange={event => {
    //         setInput(event.target.value);
    //       }}
    //     />
    //     <button
    //       onClick={async () => {
    //         setConversation((currentConversation: ClientMessage[]) => [
    //           ...currentConversation,
    //           { id: generateId(), role: 'user', display: input },
    //         ]);

    //         const message = await submitUserMessage(input);

    //         setConversation((currentConversation: ClientMessage[]) => [
    //           ...currentConversation,
    //           message,
    //         ]);
    //       }}
    //     >
    //       Send Message
    //     </button>
    //   </div>
    );
}