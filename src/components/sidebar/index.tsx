"use client";

import { Chat, Session } from "@/lib/types"
import { Separator } from "@radix-ui/react-separator"
import { AnimatePresence, motion } from "framer-motion"
import { PanelLeftClose, PanelLeftOpen, Settings } from "lucide-react"
import { useState } from "react"
import { Button } from "../ui/button"
import ConversationHistory from "./conversation-history"

function groupChatsByDate(chats: Chat[]) {
    const groups: { [key: string]: Chat[] } = {}
    const today = new Date()
    today.setHours(0, 0, 0, 0)
  
    chats.forEach(chat => {
      const chatDate = new Date(chat.createdAt)
      chatDate.setHours(0, 0, 0, 0)
  
      const diffTime = today.getTime() - chatDate.getTime()
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  
      let groupKey = ""
  
      if (diffDays === 0) groupKey = "Today"
      else if (diffDays === 1) groupKey = "Yesterday"
      else if (diffDays < 7) groupKey = "This week"
      else {
        const options = { year: "numeric" as const, month: "long" as const }
        groupKey = chatDate.toLocaleDateString("en-US", options)
      }
  
      if (!groups[groupKey]) groups[groupKey] = []
      groups[groupKey].push(chat)
    })
  
    return groups
  }
  

export default function Sidebar({
    session,
    chats
  }: Readonly<{
    session: Session
    chats: Chat[]
  }>) {
    const [historyOpen, setHistoryOpen] = useState<boolean>(false)
    const [searchTerm, setSearchTerm] = useState<string>("")
  
    const filteredChats = chats.filter(chat =>
      String(chat.title).toLowerCase().includes(searchTerm.toLowerCase())
    )
  
    const groupedChats = groupChatsByDate(filteredChats)
  
    return (
      <div className="h-full max-md:hidden min-h-0 flex flex-col gap-2">
        <div className="h-full flex gap-2">
          <AnimatePresence>
            {historyOpen && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 250, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="overflow-hidden flex flex-col w-full rounded-xl py-3 h-full text-nowrap"
              >
                <ConversationHistory
                  chats={groupedChats}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                />
              </motion.div>
            )}
          </AnimatePresence>
          <nav className="rounded-md bg-neutral-900 flex flex-col w-[60px] rounded-xl items-center gap-3 py-3 h-full">
            <Button variant="ghost" size="icon" onClick={() => setHistoryOpen(!historyOpen)}>
              {historyOpen ? (
                <PanelLeftClose width={20} height={20} strokeWidth={1.75} />
              ) : (
                <PanelLeftOpen width={20} height={20} strokeWidth={1.75} />
              )}
            </Button>
            <div className="flex-1 w-full flex flex-col items-center gap-2">
              <Separator className="w-6/12" />
              <div className="flex items-center gap-2">
                {/* <Settings session={session} /> */}
              </div>
            </div>
          </nav>
        </div>
      </div>
    )
  }