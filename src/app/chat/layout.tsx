import Sidebar from "@/components/sidebar";
import { AI } from "./ai";
import Logo from "@/components/logo";
import { Session } from "@/lib/types";
import { auth } from "@/auth";
import { getChats } from "@/app/chat/actions";

export default async function ChatLayout({
    children,
    
}: Readonly<{
    children: React.ReactNode;
}>) {
  
    const session = await ( auth( ) ) as Session;

    if ( !session?.user?.id )
        return null;

    let chats = await getChats( session.user.id );

    if ( !chats || "error" in chats )
        chats = [];

    return (
        <div className="flex flex-col overflow-auto h-full p-4">
            <div className="flex-1 h-full overflow-auto flex gap-2">
                <Sidebar
                    session={{}}
                    chats={ chats }
                />
                <AI initialAIState={[]} initialUIState={[]}>
                    { children }
                </AI>
            </div>
        </div>
    );
}

function Header() {
    return (
        <header className="flex items-center w-full mb-4 gap-3">
           
            <div>
                Hello World
            </div>
        </header>
    );
}
