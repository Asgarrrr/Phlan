import { PlusIcon, Search } from "lucide-react"
import { Input } from "../ui/input"
import { ScrollArea } from "../ui/scroll-area"
import ChatItem from "./chat-item"
import { Separator } from "../ui/separator"
import { Button } from "../ui/button"
import Link from "next/link"
import { Chat } from "@/lib/types"

export default function ConversationHistory({
    chats,
    searchTerm,
    setSearchTerm
}: {
    chats: { [key: string]: Chat[] }
    searchTerm: string
    setSearchTerm: ( term: string ) => void
}) {
    return (
        <>
            <div className="flex items-center justify-between px-4 mb-3">
                <span className="text-sm"> Conversation History </span>
            </div>

            <div className="px-4 pb-4 border-b">
                <div className="relative">
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                        type="text"
                        placeholder="Search..."
                        className="pl-8 text-sm h-8 w-full rounded-md bg-neutral-800/10 !placeholder-muted-foreground/60"
                        value={ searchTerm }
                        onChange={ ( e ) => setSearchTerm( e.target.value )}
                        aria-label="Search chat history"
                    />
                </div>
            </div>

            <ScrollArea className="space-y-2 flex-1 h-full overflow-y-auto pr-2 px-4">
                { Object.keys( chats ).length > 0 ? (
                    Object.entries( chats ).map( ( [ groupKey, groupChats ]) => (
                        <div key={ groupKey } className="flex flex-col gap-2">
                            <h4 className="sticky top-0 bg-background text-sm py-2 font-medium text-muted-foreground">
                                { groupKey }
                            </h4>
                            { groupChats.map( ( chat ) => (
                                <ChatItem key={ chat.ID } chat={ chat } />
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
                    <span> Start a new chat </span>
                </Link>
            </Button>
        </>
    )
}