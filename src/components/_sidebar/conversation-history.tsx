// import React, { useMemo } from "react";
// import { cache } from "react";
import { Button } from "@/components/ui/button"
import { Chat } from "@/lib/types";
import { MessageCircle, PanelLeftOpen, PlusIcon, Search } from 'lucide-react'
import Link from "next/link";
import { useMemo, useState } from "react";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import { Input } from "../ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

export default function ConversationHistory( { chats }: { chats: Chat[] } ) {

    const [ searchTerm, setSearchTerm ] = useState<string>( "" );
    const groupedChats = useMemo(() => {
        const filteredChats = chats.filter(chat =>
            String(chat.title).toLowerCase().includes(searchTerm.toLowerCase())
        );

        const groups: { [key: string]: Chat[] } = {};

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        filteredChats.forEach(chat => {
            const chatDate = new Date(chat.createdAt);
            chatDate.setHours(0, 0, 0, 0);

            const diffTime = today.getTime() - chatDate.getTime();
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

            let groupKey = "";

            if (diffDays === 0) groupKey = "Today";
            else if (diffDays === 1) groupKey = "Yesterday";
            else if (diffDays < 7) groupKey = "This week";
            else {
                const options = { year: "numeric" as const, month: "long" as const };
                groupKey = chatDate.toLocaleDateString( "en-US", options );
            }

            if (!groups[groupKey]) groups[groupKey] = [];

            groups[groupKey].push(chat);
        });

        return groups;
    }, [chats, searchTerm]);

    return (
        <div className="overflow-hidden flex flex-col w-full rounded-xl py-3 h-full text-nowrap">
            
            <div className="flex items-center justify-between px-4 mb-3">
                <span className="text-sm">Conversation History</span>
            </div>

            <div className="px-4 pb-4 border-b">

                <div className="relative">
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                        type="text"
                        placeholder="Rechercher..."
                        className="pl-8 text-sm h-8 w-full rounded-md bg-neutral-800/10 !placeholder-muted-foreground/60"
                        value={ searchTerm }
                        onChange={(e) => setSearchTerm(e.target.value)}
                        aria-label="Rechercher dans l'historique des chats"
                    />
                </div>

            </div>

            <ScrollArea className="space-y-2 flex-1 h-full overflow-y-auto pr-2 px-4">
                { Object.keys( groupedChats ).length > 0 ? (
                    Object.keys( groupedChats ).map( groupKey => (
                        <div key={ groupKey } className="flex flex-col gap-2">          
                            <h4 className="sticky top-0 bg-background text-sm py-2 font-medium text-muted-foreground">
                                { groupKey }
                            </h4>
                            { groupedChats[ groupKey ].map( chat => (
                                <TooltipProvider key={ chat.ID }>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            className={ `w-full justify-start text-left p-2` }
                                            // activeChat === session.id ? "bg-gray-200" : ""
                                            // onClick={() => setActiveChat(session.id)}
                                            aria-label={ `Open ${ chat.title }` }
                                        >
                                            <MessageCircle className="mr-2 h-4 w-4 flex-shrink-0" />
                                            <div className="flex-grow min-w-0">
                                            <div className="font-medium text-sm truncate">{ chat.title }</div>
                                            <div className="text-xs text-gray-500 truncate">{ chat.lastMessage }</div>
                                            </div>
                                        </Button>
                                        </TooltipTrigger>
                                        <TooltipContent side="right">
                                        <p>{ chat.title }</p>
                                        <p className="text-xs text-gray-500">{ chat.lastMessage }</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            ))}
                        </div>
                    ))
                ) : (
                    <p className="text-muted-foreground w-full flex justify-center items-center py-4">
                        No results found
                    </p>
                )}
            </ScrollArea>
            
            <Separator />

            <Button variant="outline" className="mt-3 w-full gap-2 justify-start bg-transparent text-muted-foreground" asChild>
                <Link href="/chat/new">
                    <PlusIcon className="min-h-4 max-h-4 min-w-4 max-w-4" />
                    <span>Start a new chat</span>
                </Link>
            </Button>

        </div>
    )

}