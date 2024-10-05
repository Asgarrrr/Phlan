import { auth } from "@/auth";
import { Chat, Session } from "@/lib/types";
import Sidebar from "@/components/sidebar/sidebar";
import { getChats } from "@/app/chat/actions";
import { cache } from "react";
import { redirect } from "next/navigation";

const loadChats = cache( async ( userID: string ) => {
    return await getChats( userID );
});


export default async function IndexSidebar() {

    const session = await ( auth( ) ) as Session;

    if ( !session?.user?.id )
        return null;

    const chats = await loadChats( session.user.id );

    if ( !chats || "error" in chats )
        redirect( "/" );

    return (
        <Sidebar
            session={ session }
            chats={ chats as Chat[] }
        />
    );

}


// "use client"

// import { PanelLeftOpen, PanelLeftClose } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Separator } from "../ui/separator";
// import Settings from "./settings";
// // import { auth } from "@/auth";
// import { Session } from "@/lib/types";
// import ConversationHistory from "./conversation-history";
// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// export default function Sidebar() {

//     // const session = await ( auth( ) ) as Session;

//     // if ( !session?.user?.id )
//     //     return null;

//     const [ historyOpen, setHistoryOpen ] = useState<boolean>( false );
        
//     return (
//         <div className="h-full max-md:hidden min-h-0 flex">     
//             <AnimatePresence>
//             { historyOpen && (
//                 <motion.div
//                     initial={{ width: 0 }}
//                     animate={{ width: 60 }}
//                     exit={{ width: 0 }}
//                     transition={{ duration: 0.2 }}
//                     className="rounder-md bg-neutral-900 flex flex-col w-[60] rounded-xl items-center gap-3 py-3 h-full"
//                 >
//                     <ConversationHistory/>
//                 </motion.div>
//             )}
//         </AnimatePresence>
//             <nav className="rounder-md bg-neutral-900 flex flex-col w-[60] rounded-xl items-center gap-3 py-3 h-full">
//                 <Button variant="ghost" size="icon" onClick={ () => setHistoryOpen( !historyOpen ) }>
//                     {
//                         historyOpen ? (
//                             <PanelLeftClose width={ 20 } height={ 20 } strokeWidth={ 1.75 }/>
//                         ) : (
//                             <PanelLeftOpen width={ 20 } height={ 20 } strokeWidth={ 1.75 }/>
//                         )
//                     }
//                 </Button>
//                 <div className="flex-1 w-full flex flex-col items-center gap-2">
//                     <Separator className="w-6/12"/>
//                     <div>
//                     </div>
//                 </div>
//                 {/* <div className="size-8 mb">
//                     <Settings session={ session }/>
//                 </div> */}
//             </nav>
//         </div>
//     );

// }