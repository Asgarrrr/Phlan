"use client";

import { useActions, useAIState, useUIState } from "ai/rsc";
import { ClientMessage } from "./actions";
import { useState } from "react";
import { generateId } from "ai";


export default function ChatPage() {

    const [ messages, setMessages ] = useAIState();
    const [input, setInput] = useState<string>('');
    const [conversation, setConversation] = useUIState();
    const { submitUserMessage } = useActions();

    return (
        <></>
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