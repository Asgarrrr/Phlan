import { openai } from "@ai-sdk/openai";
import { generateId, generateText } from "ai";
import { getMutableAIState, streamUI } from "ai/rsc";
import { console } from "inspector";
import { ReactNode } from "react";
import { z } from "zod";
import fs from "fs";

import { ExaClient } from "@agentic/exa";
import { createAISDKTools } from "@agentic/ai-sdk";

export type ServerMessage = {
    role: "user" | "assistant";
    content: string;
};
  
export type ClientMessage = {
    id: string;
    role: "user" | "assistant";
    display: ReactNode;
};
  
export const submitUserMessage = async ( input: string ): Promise<ClientMessage> => {
    "use server"

    const exa = new ExaClient( );
    const AIState = getMutableAIState( );

    const response = await streamUI({
        model: openai( "gpt-4o-mini" ),
        messages: [ ...AIState.get( ), { role: "user", content: input } ],
        text: ({ content, done }) => {
            if ( done ) {
                AIState.done( ( messages: ServerMessage[] ) => [
                    ...messages,
                    { role: "assistant", content },
                ] );
            }
            return <div> { content } </div>;
        },
        tools: {
            returnCodeToUser: {
                description: `
                    When the user asks for code, or when the AI thinks the user wants code, 
                    this tool will return the code to the user.",
                `,
                parameters: z.object({
                    files: z.array( z.string( ).describe( "The paths to the files that contain the code." ) ),
                    code: z.array( z.string( ).describe( "The code to return to the user." ) )
                }),
                generate: ({ files, code }) => {
                    console.log( files );
                    AIState.done( ( messages: ServerMessage[] ) => [
                        ...messages,
                        { role: "assistant", content: "Here is the code you requested:" },
                    ] );

                    return (

                        <div>
                            <h2> Here is the code you requested: (from { files.join( ", " ) }) </h2>
                            <pre>
                                { code.join( "\n" ) }
                            </pre>
                        </div>
                    );
                },

            }
        }
        
    })

    console.log( response );

    return {
        id: generateId( ),
        role: "assistant",
        display: response.value,
    };
    
}