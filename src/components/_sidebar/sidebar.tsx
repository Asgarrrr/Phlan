"use client";
import { PanelLeftOpen, PanelLeftClose } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "../ui/separator";
import Settings from "./settings";
import ConversationHistory from "./conversation-history";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Chat, Session } from "@/lib/types";

export default function Sidebar({
    session,
    chats
}: Readonly<{
    session: Session;
    chats: Chat[];
}>) {

    const [ historyOpen, setHistoryOpen ] = useState<boolean>( false );

    return (
        <div className="h-full max-md:hidden min-h-0 flex flex-col gap-2">

            <div>
                de
            </div>

            <div className="h-full flex gap-2">
                <AnimatePresence>
                    { historyOpen && (
                        <motion.div
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: 250, opacity: 1 }}
                            exit={{ width: 0, opacity: 0 }}
                            transition={{ duration: 0.2, ease: "easeInOut" }}
                        >
                            <ConversationHistory chats={ chats }/>
                        </motion.div>
                    )}
                </AnimatePresence>
                <nav className="rounder-md bg-neutral-900 flex flex-col w-[60] rounded-xl items-center gap-3 py-3 h-full">
                    <Button variant="ghost" size="icon" onClick={ () => setHistoryOpen( !historyOpen ) }>
                        {
                            historyOpen ? (
                                <PanelLeftClose width={ 20 } height={ 20 } strokeWidth={ 1.75 }/>
                            ) : (
                                <PanelLeftOpen width={ 20 } height={ 20 } strokeWidth={ 1.75 }/>
                            )
                        }
                    </Button>
                    <div className="flex-1 w-full flex flex-col items-center gap-2">
                        <Separator className="w-6/12"/>
                        <div className="flex items-center gap-2">
                            {/* <Settings session={ session }/> */}
                        </div>

                    </div>
                </nav>

           </div>
        </div>
    );
}