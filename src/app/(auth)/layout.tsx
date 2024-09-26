import * as motion from "framer-motion/client";
import DotPattern from "@/components/ui/dot-pattern";

export default function authLayout({ 
    children 
} : { 
    children: React.ReactNode 
}) {
    return (

        <div className="relative flex h-screen w-screen items-center justify-center overflow-hidden">

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="top-1 left-1 absolute w-full h-full"
            >
                <DotPattern
                    width={ 20 }
                    height={ 20 }
                    className={ "[mask-image:linear-gradient(to_bottom,rgb(255,255,255),transparent,transparent)] h-[150%]" }
                />

                <DotPattern
                    width={ 30 }
                    height={ 30 }
                    className={ "[mask-image:linear-gradient(to_bottom,rgb(255,255,255),transparent,transparent)] h-[100%]" }
                />
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, }}
                className="w-full h-full flex items-center justify-center"
            >
                { children }
            </motion.div>
        
        </div>

    )
}