import { AI } from "./ai";

export default function ChatLayout({
    children,
    
}: Readonly<{
    children: React.ReactNode;
}>) {
  
    return (
        <AI initialAIState={[]} initialUIState={[]}>
            { children }
        </AI>
    );
}