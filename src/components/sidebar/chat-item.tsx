import { Chat } from "@/lib/types";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { MessageCircle } from "lucide-react";
import { Button } from "../ui/button";

export default function ChatItem({ chat }: { chat: Chat }) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant="ghost"
                        className="w-full justify-start text-left p-2"
                        aria-label={`Open ${chat.title}`}
                    >
                        <MessageCircle className="mr-2 h-4 w-4 flex-shrink-0" />
                        <div className="flex-grow min-w-0">
                            <div className="font-medium text-sm truncate">{chat.title}</div>
                            <div className="text-xs text-gray-500 truncate">{chat.lastMessage}</div>
                        </div>
                    </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                    <p>{ chat.title }</p>
                    <p className="text-xs text-gray-500">{ chat.lastMessage }</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}